import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  jwtHelperService = new JwtHelperService();
  constructor(private accountService: AccountService) { }

  isLoggedIn(){
    const user = JSON.parse(localStorage.getItem("user"));

    // if no user, return false
    if(!user) return false;
    // if the token is expired, return false
    if(this.jwtHelperService.isTokenExpired(user["token"])) return false;

    // gets user from localstorage and sets that as active user
    this.accountService.updateUserFromLocalStorage();
  }
}
