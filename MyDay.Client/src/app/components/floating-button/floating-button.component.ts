import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private getCurrentPageService: GetCurrentPageService) { }

  ngOnInit(): void {
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
  }

  toggleInfoSection(){
    const infoSection = document.querySelector(".info-section")
    infoSection?.classList.toggle("reveal")
  }
  
}
