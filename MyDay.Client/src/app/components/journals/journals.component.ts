import { Component, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';

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
  constructor(private router:Router) {
    this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          this.checkCommentDialogue()
        }
    });
   }

  ngOnInit(): void {
  }

  popCommentDialogue(e){
    const cmtBox = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[0];
    if(cmtBox.classList.contains('normal')) cmtBox.classList.remove('normal')
    cmtBox.classList.toggle('reveal')
    const backdrop = document.querySelector('.backdrop')
    if(!backdrop.classList.contains('reveal')) backdrop.classList.add('reveal')
    backdrop.addEventListener('click', () => {
      cmtBox.classList.remove('reveal')
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
