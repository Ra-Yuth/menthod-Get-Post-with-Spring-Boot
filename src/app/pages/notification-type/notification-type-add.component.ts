import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as http from 'http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export interface NotificationType{
  subjectTemplate: string,
  name: string,
  sendCC: string,
  bodyTemplate: string
}

@Component ({
  selector: 'app-notification-type-add',
  template: `
    <p style="text-align: center;">Adding</p>
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Name</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="name"/>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>subjectTemplate</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="subjectTemplate" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>sendCC</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="sendCC" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>bodyTemplate</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="bodyTemplate" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button [disabled]="!validateForm.valid" nzType="primary" style="margin-right: 10px;">Save</button>
          <button nz-button nzType="primary" routerLink="/notification-type">Cancel</button>
        </nz-form-control>
      </nz-form-item>
    </form>


  `
})


export class NotificationTypeAddComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {}
  validateForm!: FormGroup;
  url ="http://165.232.160.86:9191/api/app/notification-type";

  submitForm(): void {
    if (this.validateForm.valid) {
      this.http.post(this.url,this.validateForm.value).subscribe( () =>{
      this.router.navigate(['notification-type']).then();

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
        subjectTemplate: ['',Validators.required],
        name: ['',Validators.required],
        sendCC: ['',Validators.required],
        bodyTemplate: ['',Validators.required]
    });
  }


}
