import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { Login } from '../_interfaces/login.modal';
import { User } from '../_interfaces/user.modal';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  isSignedUp: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  async login(options: Login){
    return this.http.post(this.baseUrl + "account/login", options).pipe(
      map((user: User) => {
        if (user){
          this.isSignedUp = true;
          this.setCurrentUser(user);
          return user
        }
      })
    )
  }

  register(model:any){
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User)  => {
        if (user){
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user:User){
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource.next(user)
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null);
  }
}