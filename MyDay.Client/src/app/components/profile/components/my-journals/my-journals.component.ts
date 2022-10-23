import { Component, OnInit } from '@angular/core';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../../../_interfaces/post-response.modal';
import { PostService } from '../../../../_services/post.service';

@Component({
  selector: 'app-my-journals',
  templateUrl: './my-journals.component.html',
  styleUrls: ['./my-journals.component.css']
})
export class MyJournalsComponent implements OnInit {
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  posts: PostReponse[] = [];
  constructor(private postService: PostService) { }

  async ngOnInit(){
    await this.getUserPosts()
  }

  async getUserPosts(){
    this.posts = await this.postService.getUserPosts("journal") as PostReponse[];
  }

}
