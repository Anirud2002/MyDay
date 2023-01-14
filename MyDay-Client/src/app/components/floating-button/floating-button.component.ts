import { Component, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { faQuestion, faPlus, faPencil, faSun } from '@fortawesome/free-solid-svg-icons';
import { GetCurrentPageService } from '../../_services/get-current-page.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
  faQuestion = faQuestion;
  faPlus = faPlus
  faPencil = faPencil;
  faSun = faSun;
  activePage: any;

  constructor(private router: Router,private getCurrentPageService: GetCurrentPageService) { 
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          this.checkInfoSection()
        }
    });
  }

  ngOnInit(): void {
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
  }

  checkInfoSection(){
    const infoSection = document.querySelector(".info-section")
    if(infoSection.classList.contains('reveal')) {
      infoSection.classList.replace('reveal', 'normal');
    }
  }

  toggleInfoSection(){
    const infoSection = document.querySelector(".info-section");
    const backdrop = document.querySelector('.backdrop');

    if(infoSection.classList.contains('normal')) infoSection.classList.remove('normal')
    infoSection?.classList.toggle("reveal")

    if(!backdrop.classList.contains('reveal')) backdrop.classList.add('reveal')
    backdrop.addEventListener('click', () => {
      infoSection.classList.remove('reveal')
      backdrop.classList.remove('reveal')
      backdrop.removeAllListeners('click')
    })
  }

  handleClick(activeAction: string){
    this.router.navigateByUrl('/', {state: {
      action: activeAction === "myday" ? "myday" : "journal"
    }})
  }
  
}
