import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
  faQuestion = faQuestion;
  constructor() { }

  ngOnInit(): void {
  }

  toggleInfoSection(){
    const infoSection = document.querySelector(".info-section")
    infoSection?.classList.toggle("reveal")
  }
  
}
