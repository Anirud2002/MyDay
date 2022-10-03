import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { Login } from '../_interfaces/login.modal';
import { User } from '../_interfaces/user.modal';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': "*"
  })

  async login(){
    return this.http.post("https://localhost:5001/api/account/login", {userName: 'Anirud2025', password: '12312312'}, {headers: this.headers}).toPromise();
  }
}
