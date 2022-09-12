import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {
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

}
