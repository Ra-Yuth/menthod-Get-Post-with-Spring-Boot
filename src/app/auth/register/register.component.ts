import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export interface RegisterComponent{
  username: string,
  email: string,
  phone: string,
  password: string
}

@Component({
  selector: 'app-register',
  template: `
        <h1 style="text-align: center">Registration</h1>
     <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="9" [nzXs]="24" nzRequired nzFor="username">Username</nz-form-label>
        <nz-form-control [nzSm]="7" [nzXs]="24" nzErrorTip="Please input your username">
        <nz-input-group nzPrefixIcon="user">
          <input nz-input type="text" formControlName="username"/>
        </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="9" [nzXs]="24" nzRequired nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSm]="7" [nzXs]="24" nzErrorTip="The input is not valid E-mail!">
        <nz-input-group nzPrefixIcon="mail">
          <input nz-input formControlName="email"/>
        </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="9" [nzXs]="24" nzRequired nzFor="phone">Phone Number</nz-form-label>
        <nz-form-control [nzSm]="7" [nzXs]="24" nzErrorTip="Please input your Phone Number">
        <nz-input-group nzPrefixIcon="phone">
          <input nz-input id="password" formControlName="phone"/>
        </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="9" [nzXs]="24" nzFor="password" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSm]="7" [nzXs]="24" nzErrorTip="Please input your password!">
        <nz-input-group nzPrefixIcon="lock">
          <input
            nz-input
            type="password"
            id="password"
            formControlName="password"
          />
        </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="9" [nzXs]="24" nzFor="checkPassword" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSm]="7" [nzXs]="20" [nzErrorTip]="errorTpl">
        <nz-input-group nzPrefixIcon="lock">
          <input nz-input type="password" formControlName="password"/>
          <ng-template #errorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">Please confirm your password!</ng-container>
            <ng-container *ngIf="control.hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </ng-template>
        </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="50" [nzOffset]="11">
      <label nz-checkbox>
            <span>
              I have read the
              <a>agreement</a>
            </span>
          </label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="50" [nzOffset]="11">
          <button [disabled]="!validateForm.valid" nz-button nzType="primary" style="margin-right: 10px;">Register</button>
          <button nz-button nzType="primary" routerLink="/auth/login">Cancel</button>
        </nz-form-control>
      </nz-form-item>
    </form>

  `
})

export class RegisterComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private router:Router

  ) {}

  validateForm!: FormGroup;
  url = "http://165.232.160.86:9191/api/auth/register";

  submitForm(): void {
    if (this.validateForm.valid) {
      this.http.post(this.url,this.validateForm.value).subscribe(() =>{
      this.router.navigate(['/auth/login']).then();
     },error => {
      console.log(error);
      });
      console.log('submit', this.validateForm.value);
    }else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
}
