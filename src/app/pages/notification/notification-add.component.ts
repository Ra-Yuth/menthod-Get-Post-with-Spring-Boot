import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
export interface NotificationComponent {
  subject: string,
  sendTo: string,
  body: string,
  status: 0,
  createOn: Date,
  typeId: 0,
  typeName: string
}


@Component ({
  selector: 'app-notification-add',
  template: `
  <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Subject</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="subject"/>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Send To</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="sendTo" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Address</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="body" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Quantity</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="status" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Date</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="createOn" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>ID</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="typeId" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Name</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="typeName" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button [disabled]="!validateForm.valid" nzType="primary" style="margin-right: 10px;">Add</button>
          <button nz-button nzType="primary" routerLink="/notification">Cancel</button>
        </nz-form-control>
      </nz-form-item>
    </form>

  `
})


export class NotificationAddComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {}
  validateForm!: FormGroup;
  url ="http://165.232.160.86:9191/api/app/notification";

  submitForm(): void {
    if (this.validateForm.valid) {
      this.http.post(this.url,this.validateForm.value).subscribe( () =>{
      this.router.navigate(['notification']).then();

      },error => {
      console.log(error);
      })

      console.log('submit', this.validateForm.value);
    } else {
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
        subject: ['',Validators.required],
        sendTo: ['',Validators.required],
        body: ['',Validators.required],
        status: ['',Validators.required],
        createOn: ['',Validators.required],
        typeId: ['',Validators.required],
        typeName: ['',Validators.required]
    });
  }
}
