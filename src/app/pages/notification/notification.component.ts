import { Component, OnInit } from "@angular/core";
import * as http from 'http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appendFile } from "fs";
import { NotificationType } from '../notification-type/notification-type.component';
export interface Notification {
      subject: string,
      sendTo: string,
      body: string,
      status: number,
      createOn: string,
      typeId: number,
      typeName: string
}


@Component ({
selector: 'app-notification',
template:  `
<nz-layout>
  <nz-header></nz-header>
  <nz-content>
  <nz-table #columnTable [nzData]="Data" [nzScroll]="{ x: '1100px' }">
      <thead>
        <tr>
          <th style="background-color: blue;">#</th>
          <th nzLeft style="background-color: blue;">Subject</th>
          <th style="background-color: blue;">SendTo</th>
          <th style="background-color: blue;">Body</th>
          <th style="background-color: blue;">Status</th>
          <th style="background-color: blue;">createOn</th>
          <th style="background-color: blue;">ID</th>
          <th style="background-color: blue;">Name</th>
          <th nzRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of columnTable.data; let i = index;">
          <td>{{i+1}}</td>
          <td style="color: green;" nzLeft>{{ data.subject }}</td>
          <td style="color: orange;">{{ data.sendTo }}</td>
          <td style="font-size: 7px;">{{ data.body }}</td>
          <td>{{ data.status }}</td>
          <td>{{ data.createOn }}</td>
          <td>{{ data.typeId }}</td>
          <td>{{ data.typeName }}</td>
          <div style="padding-top: 50px;">
          <td nzRight>
            <a>action</a>
            <nz-divider nzType="vertical"></nz-divider>
            <a routerLink="/notification-add" nz-button>ADD</a>
          </td>
          </div>
        </tr>
      </tbody>
    </nz-table>
  </nz-content>
</nz-layout>

`,
styles: [`
    nz-layout{
      background-color: red;
    }
    nz-header{
      background-color: black;
    }
`
]
})


export class NotificationComponent implements OnInit{
  constructor(
    private http:HttpClient
  ){}


  ngOnInit(): void {
   this.search();

  }
  Data: Notification[] = [];
url ="http://165.232.160.86:9191/api/app/notification";
  search (){
    this.http.get(this.url, {
      headers: new HttpHeaders({'Content-Type': 'Application/json'}),
      params: new HttpParams()
        .append('filter','')
        .append('formDate','')
        .append('toDate','')
        .append('typeId','0')
        .append('status','0')
        .append('pageNo','1')
        .append('pageSize','10')

    }).subscribe((result:any)=>{
      this.Data =result.data
      console.log(result);
    },error =>{
      console.log(error);
    });




  }
}

