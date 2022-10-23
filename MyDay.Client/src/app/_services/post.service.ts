import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  async post(value: CreatePost){
    return this.http.post(this.baseUrl + "post", value).pipe(
      map(post => {
        return post;
      })
    )
  }
}
