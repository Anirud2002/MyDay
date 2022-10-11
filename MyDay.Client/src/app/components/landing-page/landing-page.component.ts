import { Component, OnInit } from '@angular/core';
import * as customCkEditor from '../../customCkBuild/build/ckeditor.js';
import { faPaperPlane, faQuestion, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostService } from '../../_services/post.service';
import { Post } from '../../_interfaces/post.modal.js';

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
  post: Post;
  constructor(private router: Router, private postService: PostService) { 
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

  async share(){
    let post = {
      postedOn: new Date().toLocaleString(),
      body: this.editorContent,
      category: this.activeDropdownItem === "MyDay" ? "MYDAY" : "JOURNAL",
      // ********** FIX MEEE *****************
      hashtags: this.activeDropdownItem === "MyDay" ? ["LYF", "SAD"] : []
    } as Post
    const response = await this.postService.post(post);
      response.subscribe(res => {
        console.log(res)
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
