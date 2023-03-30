import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../_interfaces/login.modal';
import { AccountService } from '../../_services/account.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginValues: Login = {
    userName: "",
    password: ""
  }
  isCredentialMatched: boolean = true;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async signIn(){
      const response = await this.accountService.login(this.loginValues);
      response.subscribe({
        next: res => {
          if(res){
            this.router.navigateByUrl("/profile")
          }
        },
        error: err => {
          if(err){
            console.log(err)
            this.isCredentialMatched = false;
          }
        }
      })
  }

}
