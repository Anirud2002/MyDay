import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../_interfaces/post-response.modal';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent implements OnInit {
  @Input() post: PostReponse;
  @Output() commentClicked = new EventEmitter<boolean>();
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  constructor() { }

  ngOnInit(): void {
  }

  popCommentDialogue(e){
    // const cmtBox = e.target.parentElement.parentElement.childNodes[0];
    // if(cmtBox.classList.contains('normal')) cmtBox.classList.remove('normal')
    // cmtBox.classList.toggle('reveal')
    // const backdrop = document.querySelector('.backdrop')
    // if(!backdrop.classList.contains('reveal')) backdrop.classList.add('reveal')
    // backdrop.addEventListener('click', () => {
    //   cmtBox.classList.remove('reveal')
    //   backdrop.classList.remove('reveal')
    //   backdrop.removeAllListeners('click')
    // })
    this.commentClicked.emit(true);
  }

}
