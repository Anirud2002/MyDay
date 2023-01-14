import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../_interfaces/register.modal';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerValues: Register = {
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }
  confirmPassword: string = "";
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async signUp(){
    if(this.confirmPassword !== this.registerValues.password){
      console.log("Password not matched")
      return
    }
    try {
      const response = await this.accountService.register(this.registerValues);
      response.subscribe(res => {
        if(res) this.router.navigateByUrl("/")
      })
      
    } catch (error) {
      console.log(error)
    }

  }

}
