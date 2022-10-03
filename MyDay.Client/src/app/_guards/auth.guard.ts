import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router){ 
  }
  
  canActivate(): Observable<any> {
    if(this.accountService.isSignedUp){
      return of(true)
    }
    console.log("Sorry bro, go and sign up first you loser")
    return of(false)
    
  }
  
}
