import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../../models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://181.111.19.117:5198/auth/login'

  constructor(private http : HttpClient) { }

  onLogin(dataLogin:LoginUser): Observable<any>{
    return this.http.post(this.API_URL,dataLogin);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
