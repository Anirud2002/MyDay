import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from '../../../../_interfaces/user-details.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user:User;
  userDetails: UserDetails;
  faArrowRightFromBracket = faArrowRightFromBracket;
  constructor(private accountService: AccountService) { }

  async ngOnInit() {
    await this.getUserDetails();
  }

  async getUserDetails(){
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })
    this.userDetails = await this.accountService.getUserDetails(this.user.userName) as UserDetails;
  }

  logout(){
    this.accountService.logout();
  }

}
