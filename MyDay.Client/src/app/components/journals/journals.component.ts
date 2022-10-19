import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle, faShare, faHeart, faComment, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../_interfaces/post-response.modal';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css']
})
export class JournalsComponent implements OnInit {
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  faChevronDown = faChevronDown;
  posts: PostReponse[] = [];
  activeJournalCategory: string = 'Motivating';
  journalCategories: string[] = ['Motivating', 'Grateful', 'Sad']
  constructor(private router:Router, private postService: PostService) { }

  async ngOnInit() {
    await this.getPosts();
  }

  async getPosts(){
    this.posts = await this.postService.getPosts("journal") as PostReponse[];
  }

  toggleDropdown(){
    document.querySelector('.dropdown').classList.toggle('reveal')
    document.querySelector('.down-arrow').classList.toggle('rotate')
  }

  changeActiveDropdownItem(category){
    this.activeJournalCategory = category;
  }
}
