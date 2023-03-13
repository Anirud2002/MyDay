import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { GetCurrentPageService } from '../../_services/get-current-page.service';
import { AccountService } from '../../_services/account.service';
import { AuthCheckService } from '../../_services/auth-check.service';
import { User } from '../../_interfaces/user.modal';
import { map, tap } from 'rxjs';
import { UserDetails } from '../../_interfaces/user-details.modal';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  userDetails: UserDetails;
  faUserCircle = faUserCircle;
  faQuestionCircle = faQuestionCircle;
  activePage: any;
  fetchingData: boolean = false;
  constructor(private router: Router, 
    private getCurrentPageService: GetCurrentPageService,
    private accountService: AccountService,
    private authService: AuthCheckService, // this is getting used in the HTML file
    private profileService: ProfileService,
    ) { }

  async ngOnInit() {
    this.user = this.accountService.getUser();
    if(this.user){
      this.userDetails = await this.accountService.getUserDetails(this.user.userName);
    }
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
    this.subscribeToProfilePicUpdates();
  } 

  subscribeToProfilePicUpdates(){
    this.profileService.profilePicUpdated$.subscribe(res => {
      this.userDetails.profilePic = res;
    })
  }

  toggleNav(e:any){
    const navBurger = document.querySelector('.nav-burger');
    navBurger.classList.toggle('show')
  }

  closeBurger(){
    const navBurger = document.querySelector('.nav-burger');
    if(navBurger.classList.contains('show')) {
      navBurger.classList.remove('show')
    }
  }

}
