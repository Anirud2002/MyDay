import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CommentDTO } from '../../../../_interfaces/commentDTO.modal';
import { PostReponse } from '../../../../_interfaces/post-response.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { ReactionService } from '../../../../_services/reaction.service';
import { Comment } from './comment.modal';
@Component({
  selector: 'app-comment-dialogue',
  templateUrl: './comment-dialogue.component.html',
  styleUrls: ['./comment-dialogue.component.css']
})
export class CommentDialogueComponent implements OnInit {
  @Input() post: PostReponse;
  user: User;
  comments: Comment[];
  newComment: CommentDTO;
  faUserCircle = faUserCircle;
  faPaperPlane = faPaperPlane;
  constructor(private reactionService: ReactionService, 
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.comments = this.post.comments;
    this.user = this.accountService.getUser();
    if(this.user) this.setupNewComment()
  }

  async sendComment(){
    await this.reactionService.sendComment(this.newComment).then(() => {
      this.comments.push({
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        commentBody: this.newComment.comment,
        commentedOn: new Date().toUTCString()
      });
      this.newComment.comment = "";
    })
  }

  setupNewComment(){
    this.newComment = {
      postID: this.post.postID,
      comment: "",
      postCreatedDate: this.post.postedOn,
      userName: this.user.userName
    }
  }

}
