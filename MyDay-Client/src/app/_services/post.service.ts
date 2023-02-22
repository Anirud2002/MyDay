import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { CreatePost } from '../_interfaces/create-post.modal';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  async getPosts(category: string){
    return this.http.get(this.baseUrl + "post/" + category.toUpperCase()).toPromise();
  }

  async getUserPosts(category: string){
    return this.http.get(this.baseUrl + "post/userposts/" + category.toUpperCase()).toPromise();
  }

  async post(fd: FormData){
    return this.http.post(this.baseUrl + "post", fd).pipe(
      map(post => {
        return post;
      })
    )
  }

  async deletePost(postID: string, date: number){
    return this.http.delete(this.baseUrl + `post/${postID}/${date}`);
  }
}
