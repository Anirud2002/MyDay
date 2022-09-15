import { Component, OnInit } from '@angular/core';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
