import { Component, OnInit } from '@angular/core';
import * as customCkEditor from '../../customCkBuild/build/ckeditor.js';
import { faPaperPlane, faQuestion, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostService } from '../../_services/post.service';
import { CreatePost } from '../../_interfaces/create-post.modal.js';
import { AccountService } from '../../_services/account.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public Editor = customCkEditor;
  activeDropdownItem: string = 'MyDay';
  dropDownItems: string[] = ["MyDay", "Journal"];
  editorContent: string = "";
  faPaperPlane = faPaperPlane;
  faQuestion = faQuestion;
  faChevronDown= faChevronDown;
  activeAction: string = "";
  hashtags: string[] = ["sad"];
  post: FormGroup;
  photo: any;
  constructor(private router: Router, 
    private postService: PostService, 
    private accountService: AccountService,
    private fb: FormBuilder) { 
    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.activeAction = this.router.getCurrentNavigation().extras.state['action'];
    }
  }

  ngOnInit(): void {
    this.validateActiveDropDownItem();
    // customCkEditor
    // .create( document.querySelector( '#editor' ), {
    //     toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload' ],
    //     simpleUpload: {
    //       uploadUrl: "https://localhost:5001"
    //     },
    //     heading: {
    //         options: [
    //             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //         ]
    //     }
    // } )
    // .catch( error => {
    //     console.log( error );
    // } );
  }

  validateActiveDropDownItem(){
    if(this.activeAction){
      if(this.activeAction === 'myday') this.activeDropdownItem = "MyDay"
      else this.activeDropdownItem = "Journal"
    }
  }

  async share(){
    // if not signed in, go the the signIn page
    if(!this.accountService.isSignedUp){
      this.router.navigateByUrl("/signIn");
      return;
    }
    let fd = new FormData();
    fd.append('body', this.editorContent);
    fd.append('category', this.activeDropdownItem.toUpperCase());
    fd.append('hashtags', JSON.stringify(this.hashtags));
    fd.append('photo', this.photo);

    const response = await this.postService.post(fd);
    response.subscribe(res => {
      this.editorContent = "";
    })
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
