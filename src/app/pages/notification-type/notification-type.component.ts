import { Component, OnInit } from "@angular/core";
import * as http from 'http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface NotificationType{
      id: number,
      subjectTemplate: string,
      name: string,
      sendCC: string,
      bodyTemplate: string
}

@Component({
    selector: 'app-notification-type',
    template: `
     <nz-layout>
      <nz-header>
        <div style="width:220px;">
        <input nz-input (ngModelChange)="searchText= $event; search();" [(ngModel)]="searchText" placeholder="Search..."/>
        </div>
        <div>
        <button routerLink="/notification-type-add" nz-button nzType="primary">Add Notification Type</button>
        </div>
      </nz-header>
      <nz-content>
        <nz-table #smallTable nzSize="small" [nzData]="data">
         <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>subjectTemplate</th>
          <th>sendCC</th>
          <th>bodyTemplate</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of smallTable.data let i = index;">
          <td>{{ i+1 }}</td>
          <td>{{data.name}}</td>
          <td>{{data.subjectTemplate}}</td>
          <td>{{data.sendCC }}</td>
          <td>{{data.bodyTemplate }}</td>
      </tr>
      </tbody>
    </nz-table>
      </nz-content>
     </nz-layout>
    `,
  styles:[`
    nz-layout{
      background-color: inherit;
    }
    nz-header{
      padding:0px;
      background-color: inherit;
      display: flex;
      justify-content: space-between;
    }

  `]
})


export class NotificationTypeComponent implements OnInit{
  constructor(
    private http:HttpClient,
  ) {}
  ngOnInit(): void {
    this.search();
  }
  data: NotificationType[] = [];
  searchText: string = '';
  url ="http://165.232.160.86:9191/api/app/notification-type";
  search(){
     this.http.get(this.url, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: new HttpParams()
          .append('pageNo','1')
          .append('pageSize','10')
          .append('name',this.searchText)
     }).subscribe((result:any)=>{
      this.data = result.data
      console.log(result);
     },error =>{
      console.log(error);
     })
  }
}
