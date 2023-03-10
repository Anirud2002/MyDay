import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { GetCurrentPageService } from '../../_services/get-current-page.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_interfaces/user.modal';
import { map, tap } from 'rxjs';
import { UserDetails } from '../../_interfaces/user-details.modal';
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
  constructor(private router: Router, 
    private getCurrentPageService: GetCurrentPageService,
    private accountService: AccountService,) { }

  async ngOnInit() {
    this.user = this.accountService.getUser();
    this.userDetails = await this.accountService.getUserDetails(this.user.userName);
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
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
