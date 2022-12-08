import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from '../../../../_interfaces/user-details.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user:User;
  userDetails: UserDetails;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faPencil = faPencil;
  faXmark = faXmark;
  name: string;
  city: string;
  description: string;
  joined: Date;
  
  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.userDetails = await this.getUserDetails();
    this.name = this.userDetails.firstName + " " + this.userDetails.lastName;
    this.city = this.userDetails.city;
    this.description = this.userDetails.description;
    this.joined = this.userDetails.joined;
  }

  async getUserDetails(){
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })
    return await this.accountService.getUserDetails(this.user.userName) as UserDetails;
  }


  logout(){
    this.accountService.logout();
  }
}
