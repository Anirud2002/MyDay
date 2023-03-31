import { Component, OnInit } from '@angular/core';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../../../_interfaces/post-response.modal';
import { PostService } from '../../../../_services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  posts: PostReponse[] = [];
  optionHidden: boolean = true;
  dataLoaded: boolean = false;
  constructor(private postService: PostService) { }

  async ngOnInit(){
    await this.getUserPosts()
  }

  async getUserPosts(){
    this.posts = await this.postService.getUserPosts("myday").then((res) => {
      this.dataLoaded = true;
      if(res) return res
    })
    .catch(err => {
      this.dataLoaded = true;
      console.log(err);
    }) as PostReponse[];
    
  }

  toggleOptions(e){
    const optionsBox = e.target.parentElement.childNodes[3];
    if(optionsBox.classList.contains('normal')) optionsBox.classList.remove('normal')
    optionsBox.classList.toggle('reveal');
    const backdrop = document.querySelector('.backdrop')
    if(!backdrop.classList.contains('reveal')) backdrop.classList.add('reveal')
    backdrop.addEventListener('click', () => {
      optionsBox.classList.remove('reveal')
      backdrop.classList.remove('reveal')
      backdrop.removeAllListeners('click')
    })
  }

  deletePost(id){
    this.posts = this.posts.filter(post => post.postID != id);
  }
}
