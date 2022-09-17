import { Injectable } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentPageService {
  activePage = new Subject();
  constructor(private router: Router) {
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationEnd) {
          this.getActivePage();
        }
    });
  }

  getActivePage(){
    this.activePage.next(this.router.url);
  }

  getActivePageObservable(){
    return this.activePage.asObservable();
  }
}
