import {Component} from "@angular/core";

@Component({
  selector: 'app-page',
  template: `
    <nz-layout class="app-layout">
      <nz-sider class="menu-sidebar"
                nzCollapsible
                nzWidth="256px"
                nzBreakpoint="md"
                [(nzCollapsed)]="isCollapsed"
                [nzTrigger]="null">
        <div class="sidebar-logo">
          <a href="https://ng.ant.design/" target="_blank">
            <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo">
            <h1>Ant Design Of Vireakyuth</h1>
          </a>
        </div>
        <ul nz-menu nzTheme="dark" nzMode="inline" [nzInlineCollapsed]="isCollapsed">
          <li nz-menu-item routerLink="/home">
            <i nz-icon nzType="home"></i>
            <span>Home</span>
          </li>
          <li nz-menu-item routerLink="/notification-type">
            <i nz-icon nzType="file-search"></i>
            <span>Notification Type</span>
          </li>
          <li nz-menu-item routerLink="notification">
            <i nz-icon nzType="file-text"></i>
            <span>Notification</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header>
          <div class="app-header">
        <span class="header-trigger" (click)="isCollapsed = !isCollapsed">
            <i class="trigger"
               nz-icon
               [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            ></i>
        </span>
          </div>
        </nz-header>
        <nz-content>
          <div class="inner-content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [`
    :host {
      display: flex;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .app-layout {
      height: 100vh;
    }

    .menu-sidebar {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      box-shadow: 2px 0 6px rgba(0,21,41,.35);
    }

    .header-trigger {
      height: 64px;
      padding: 20px 24px;
      font-size: 20px;
      cursor: pointer;
      transition: all .3s,padding 0s;
    }

    .trigger:hover {
      color: #1890ff;
    }

    .sidebar-logo {
      position: relative;
      height: 64px;
      padding-left: 24px;
      overflow: hidden;
      line-height: 64px;
      background: black;
      transition: all .3s;
    }

    .sidebar-logo img {
      display: inline-block;
      height: 32px;
      width: 32px;
      vertical-align: middle;
    }

    .sidebar-logo h1 {
      display: inline-block;
      margin: 0 0 0 20px;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
      vertical-align: middle;
    }

    nz-header {
      padding: 0;
      width: 100%;
      z-index: 2;
    }

    .app-header {
      position: relative;
      height: 64px;
      padding: 0;
      background: black;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }

    nz-content {
      margin: 24px;
    }

    .inner-content {
      padding: 24px;
      background: inherit;
      height: 100%;
    }
  `]
})

export class PageComponent{
  isCollapsed = false;

}
