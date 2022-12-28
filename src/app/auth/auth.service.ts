import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, retry} from "rxjs";
import * as http from "http";

export const BASE_API_URL = "http://165.232.160.86:9191/api/auth";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({providedIn:"root"})

export class AuthService{
    register(value: any) {
      throw new Error("Method not implemented.");
    }
    constructor(
      private httpClient:HttpClient
    ) {
    }

    login(model: any): Observable<any>{
      return this.httpClient.post(`${BASE_API_URL}/login`,model, httpOptions).pipe(
        map(result => {
          localStorage.setItem('auth',JSON.stringify(result));
          return result;
        })
      )
    }

    refresh(refresh:any): Observable<any>{
      return this.httpClient.post(`${BASE_API_URL}/refresh`,refresh, httpOptions);
    }
}
