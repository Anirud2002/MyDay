import { Component, Input, OnInit } from '@angular/core';
import * as customCkEditor from '../../customCkBuild/build/ckeditor.js';
import { faPaperPlane, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public Editor = customCkEditor;
  editorContent: string = "";
  faPaperPlane = faPaperPlane;
  faQuestion = faQuestion;
  constructor() { }

  ngOnInit(): void {
  }

  share(){
    console.log(this.editorContent)
  }
}
