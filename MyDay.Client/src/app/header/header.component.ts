import { Component, OnInit } from '@angular/core';
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle;
  faQuestionCircle = faQuestionCircle;
  constructor() { }

  ngOnInit(): void {
  }

  toggleNav(e:any){
    e.target.parentElement.classList.toggle('show')
  }

}
