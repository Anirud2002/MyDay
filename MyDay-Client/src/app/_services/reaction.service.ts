import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDTO, LikeDTO } from '../_interfaces/reactionDTOs.modal';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  constructor(private http: HttpClient) { }

  likePost(likeDTO: LikeDTO){
    return this.http.post(environment.apiUrl + "reaction/add-like", likeDTO).toPromise();
  }

  sendComment(commentDTO: CommentDTO){
    return this.http.post(environment.apiUrl + "reaction/add-comment", commentDTO).toPromise();
  }
}
