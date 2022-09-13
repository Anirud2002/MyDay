import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faPaperPlane, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public Editor = ClassicEditor;
  faPaperPlane = faPaperPlane;
  faQuestion = faQuestion;
  constructor() { }

  ngOnInit(): void {
  }


}
