import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../_interfaces/post-response.modal';
import { PostService } from '../../_services/post.service';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  posts: PostReponse[] = [];
  dataLoaded: boolean = false;

  constructor(private router: Router, private postService: PostService) { }

  async ngOnInit(){
    await this.getPosts();
  }

  async getPosts(){
    this.dataLoaded = false;
    this.posts = await this.postService.getPosts("myday").then((res) => {
      this.dataLoaded = true;
      if(res) return res;
    }) as PostReponse[];
  }

}
