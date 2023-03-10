import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private accountService: AccountService, private router: Router){ 
  }
  
  canLoad(): Observable<any> {
    if(this.accountService.isSignedUp){
      return of(true)
    }
    this.router.navigateByUrl("/signIn")
    return of(false)
    
  }
  
}
