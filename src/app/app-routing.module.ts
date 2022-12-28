import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./pages/page.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RouteGuard} from "./helpers/route.guard";
import {NotificationTypeComponent} from './pages/notification-type/notification-type.component';
import { NotificationTypeAddComponent } from './pages/notification-type/notification-type-add.component';
import { RegisterComponent } from './auth/register/register.component';
import {NotificationComponent} from './pages/notification/notification.component';
import { NotificationAddComponent } from './pages/notification/notification-add.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'notification-type',
        component: NotificationTypeComponent
      },
      {
        path: 'notification-type-add',
        component: NotificationTypeAddComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'notification-add',
        component: NotificationAddComponent
      }
    ],
    canActivate: [RouteGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
