import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Info } from '../../../../_interfaces/info.modal';
import { UserDetails } from '../../../../_interfaces/user-details.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { ProfileService } from '../../../../_services/profile.service';

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
  userName: string;
  city: string;
  description: string;
  joined: Date;
  
  constructor(private accountService: AccountService, private profileService: ProfileService) { }

  async ngOnInit() {
    this.userDetails = await this.getUserDetails();
    this.name = this.userDetails.firstName + " " + this.userDetails.lastName;
    this.userName = this.userDetails.userName;
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

  async validateAndSave(){
    if(!this.name || !this.userName){
      return;
    }

    let info = {fullName: this.name, userName: this.userName, city: this.city, description: this.description} as Info
    try {
      const res = await this.profileService.saveInfo(info);
      // update the value from the response in the UI
    } catch (error) {
      // handle any server error
    }
   
  }


  logout(){
    this.accountService.logout();
  }
}
