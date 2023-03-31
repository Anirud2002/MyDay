import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject } from 'rxjs';
import { Login } from '../_interfaces/login.modal';
import { UserDetails } from '../_interfaces/user-details.modal';
import { User } from '../_interfaces/user.modal';
import { ProfileService } from './profile.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user:User;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  isSignedUp: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router, 
    private profileService: ProfileService
  ) { }

  login(options: Login){
    return this.http.post(environment.apiUrl + "account/login", options).pipe(
      map(async (user: User) => {
        if (user){
          this.isSignedUp = true;
          this.setCurrentUser(user);
          let userDetails = await this.getUserDetails(user.userName);
          if(userDetails.profilePic.url){
            this.profileService.updateProfilePic(userDetails.profilePic)
          }
          return user
        }
      })
    )
  } 

  register(model:any){
    return this.http.post(environment.apiUrl + "account/register", model).pipe(
      map((user: User)  => {
        if (user){
          this.isSignedUp = true;
          this.setCurrentUser(user)
          return user;
        }
      })
    )
  }

  getUser(): User{
    return this.user;
  }

  getUserDetails(userName: string): Promise<UserDetails>{
    return this.http.get<UserDetails>(environment.apiUrl + "user/" + userName).toPromise()
  }

  setCurrentUser(user:User){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource.next(user)
  }

  updateUserFromLocalStorage(){
    this.currentUserSource.next(JSON.parse(localStorage.getItem("user")));
    this.user = JSON.parse(localStorage.getItem("user"));
    this.isSignedUp = true;
  }

  backToSignInPage(){
    this.router.navigateByUrl("/signIn");
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.isSignedUp = false;

    this.router.navigateByUrl("/signIn");
  }
}
