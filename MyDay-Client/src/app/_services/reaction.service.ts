import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDTO } from '../_interfaces/commentDTO.modal';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  sendComment(commentDTO: CommentDTO){
    return this.http.post(this.baseUrl + "reaction/addComment", commentDTO).toPromise();
  }
}
