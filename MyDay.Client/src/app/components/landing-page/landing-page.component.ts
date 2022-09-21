import { Component, OnInit } from '@angular/core';
import * as customCkEditor from '../../customCkBuild/build/ckeditor.js';
import { faPaperPlane, faQuestion, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public Editor = customCkEditor;
  activeDropdownItem: string = 'MyDay';
  editorContent: string = "";
  faPaperPlane = faPaperPlane;
  faQuestion = faQuestion;
  faChevronDown= faChevronDown;
  activeAction: string = "";
  constructor(private router: Router) { 
    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.activeAction = this.router.getCurrentNavigation().extras.state['action'];
    }
  }

  ngOnInit(): void {
    this.validateActiveDropDownItem()
  }

  validateActiveDropDownItem(){
    if(this.activeAction){
      if(this.activeAction === 'myday') this.activeDropdownItem = "MyDay"
      else this.activeDropdownItem = "Journal"
    }
  }

  share(){
    console.log(this.editorContent)
  }

  toggleDropdown(){
    document.querySelector('.dropdown').classList.toggle('reveal')
    document.querySelector('.down-arrow').classList.toggle('rotate')
  }

  changeActiveDropdownItem(){
    if(this.activeDropdownItem === "MyDay") {
      this.activeDropdownItem = "Journal"
      return
    }
    this.activeDropdownItem = "MyDay"
  }
}
