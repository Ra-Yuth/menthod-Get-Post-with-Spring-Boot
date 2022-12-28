import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <div nz-row nzAlign="middle" nzJustify="center" style="height: 100vh">
      <div nz-col>
        <h1 style="text-align: center">Login</h1>
        <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="submitForm()">
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your username!">
              <nz-input-group nzPrefixIcon="user">
                <input type="text" nz-input formControlName="username" placeholder="Username" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control nzErrorTip="Please input your Password!">
              <nz-input-group nzPrefixIcon="lock">
                <input type="password" nz-input formControlName="password" placeholder="Password" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <div nz-row class="login-form-margin">
            <div nz-col [nzSpan]="12">
              <label nz-checkbox formControlName="remember">
                <span>Remember me</span>
              </label>
            </div>
            <div nz-col [nzSpan]="12">
              <a class="login-form-forgot">Forgot password</a>
            </div>
          </div>
          <button nz-button [disabled]="!validateForm.valid" class="login-form-button login-form-margin" [nzType]="'primary'">Log in</button>
          Or
          <button routerLink="/auth/register" style="display: inherit;">Register Now!</button>
        </form>
      </div>
    </div>

  `
  ,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `
  ]
})

export class LoginComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {}

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value).subscribe(()=>{
        this.router.navigate(['home']).then();
      },error => {
        console.log(error);
        }
      )
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
      username: ['',Validators.required],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
