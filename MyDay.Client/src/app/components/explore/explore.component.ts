import { Component, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
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
  constructor(private router: Router, private postService: PostService) { 
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          this.checkCommentDialogue()
        }
    });
  }

  async ngOnInit(){
    await this.getPosts();
  }

  async getPosts(){
    this.posts = await this.postService.getPosts("myday") as PostReponse[];
  }

  popCommentDialogue(){
    const cmntDialogueBox = document.querySelector('.comment-dialogue')
    if(cmntDialogueBox.classList.contains('normal')) cmntDialogueBox.classList.remove('normal')
    cmntDialogueBox.classList.toggle('reveal')
    const backdrop = document.querySelector('.backdrop')
    if(!backdrop.classList.contains('reveal')) backdrop.classList.add('reveal')
    backdrop.addEventListener('click', () => {
      cmntDialogueBox.classList.remove('reveal')
      backdrop.classList.remove('reveal')
      backdrop.removeAllListeners('click')
    })
  }

  checkCommentDialogue(){
    const cmtBox = document.querySelectorAll('.comment-dialogue');
    cmtBox.forEach(box => {
      if(box.classList.contains('reveal')) box.classList.replace('reveal', 'normal')
    })
  }

}
