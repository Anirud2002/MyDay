import { Component, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
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
  constructor(private router: Router) { 
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          this.commentDialogue()
        }
    });
  }

  ngOnInit(): void {
  }

  popCommentDialogue(){
    const cmtBox = document.querySelector('.comment-dialogue');
    if(cmtBox.classList.contains('normal')) cmtBox.classList.remove('normal')
    cmtBox.classList.toggle('reveal')
  }

  commentDialogue(){
    const cmtBox = document.querySelector('.comment-dialogue');
    if(cmtBox.classList.contains('reveal')) cmtBox.classList.replace('reveal', 'normal')
  }

}
