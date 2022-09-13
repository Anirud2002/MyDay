import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle;
  faQuestionCircle = faQuestionCircle;
  activePage: string = "";
  constructor(private router: Router) { 
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationEnd) {
          this.getActivePage();
        }
    });
  }

  ngOnInit(): void {
    this.getActivePage();
  }

  getActivePage(){
    this.activePage = this.router.url;
  }

  toggleNav(e:any){
    e.target.parentElement.classList.toggle('show')
  }

}
