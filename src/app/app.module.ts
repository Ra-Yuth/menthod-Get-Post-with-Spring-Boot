import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {PageComponent} from "./pages/page.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {NgZorroAntdModule} from "./ng-zorro-antd.module";
import {TokenInterceptor} from "./helpers/token.interceptor";
import { NotificationTypeComponent } from './pages/notification-type/notification-type.component';
import { NotificationTypeAddComponent } from './pages/notification-type/notification-type-add.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationAddComponent } from './pages/notification/notification-add.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotificationTypeComponent,
    NotificationTypeAddComponent,
    NotificationComponent,
    NotificationAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
