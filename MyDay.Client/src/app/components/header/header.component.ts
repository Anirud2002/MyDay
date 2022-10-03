import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { GetCurrentPageService } from '../../_services/get-current-page.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_interfaces/user.modal';
import { map, tap } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  faUserCircle = faUserCircle;
  faQuestionCircle = faQuestionCircle;
  activePage: any;
  constructor(private router: Router, 
    private getCurrentPageService: GetCurrentPageService,
    private accountService: AccountService,) { }

  ngOnInit(): void {
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
    this.assignEventListeners()
  }

  toggleNav(e:any){
    e.target.parentElement.classList.toggle('show')
  }

  assignEventListeners(){
    const burgerLinks = document.querySelectorAll('.burger-links li')
    burgerLinks.forEach(link => {
      link.addEventListener('click', () => {
        if(document.querySelector('.nav-burger').classList.contains('show')) document.querySelector('.nav-burger').classList.remove('show')
      })
    })
  }

}
