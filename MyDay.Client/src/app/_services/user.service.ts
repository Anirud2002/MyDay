import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../_interfaces/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {authenticated: false};
  userSubject = new Subject<User>();
  constructor() { }

  getUserObservable(){
    return this.userSubject.asObservable();
  }
}
