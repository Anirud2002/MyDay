import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle, faShare, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { PostReponse } from '../../../../_interfaces/post-response.modal';
import { LikeDTO } from '../../../../_interfaces/reactionDTOs.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { ReactionService } from '../../../../_services/reaction.service';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent implements OnInit {
  @Input() post: PostReponse;
  user: User;
  faUserCircle = faUserCircle;
  faShare = faShare;
  faHeart = faHeart;
  faComment = faComment;
  isPostLiked: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private reactionService: ReactionService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.getUser();
    this.checkIfPostAleadyLiked();
    if(this.user){
      this.isLoggedIn = true;
    }

    this.accountService.currentUser$.subscribe(res => {
      this.user = res;
      if(this.user){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  checkIfPostAleadyLiked(){
    const res = this.post.likedBy.find(userName => userName === this.user.userName); // check if user has already liked
    if(res){
      this.isPostLiked = true;
    }
  }

  async handleLikePost(postToLike:PostReponse){
    const likeDTO = {
      postID: this.post.postID,
      postCreatedDate: this.post.postedOn,
      isLiked: this.isPostLiked
    } as LikeDTO
    if(!this.isPostLiked){
      await this.reactionService.likePost(likeDTO);
      postToLike.likes++;
      this.isPostLiked = true;
    }else{
      await this.reactionService.likePost(likeDTO);
      postToLike.likes--;
      this.isPostLiked = false;
    }
  }

  popCommentDialogue(e){
    const cmntDialogueBox = e.target.parentElement.parentElement.childNodes[0];
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

}
