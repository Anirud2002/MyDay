import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-comment-dialogue',
  templateUrl: './comment-dialogue.component.html',
  styleUrls: ['./comment-dialogue.component.css']
})
export class CommentDialogueComponent implements OnInit {
  @Input() comments: Comment
  faUserCircle = faUserCircle;
  faPaperPlane = faPaperPlane;
  constructor() { }

  ngOnInit(): void {
  }

}
