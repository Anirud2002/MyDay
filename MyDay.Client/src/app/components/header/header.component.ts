import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { GetCurrentPageService } from '../../_services/get-current-page.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle;
  faQuestionCircle = faQuestionCircle;
  activePage: any;
  constructor(private router: Router, private getCurrentPageService: GetCurrentPageService) { }

  ngOnInit(): void {
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
  }

  toggleNav(e:any){
    e.target.parentElement.classList.toggle('show')
  }

}
