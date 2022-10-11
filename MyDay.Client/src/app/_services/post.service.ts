import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Post } from '../_interfaces/post.modal';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  async post(value: Post){
    return this.http.post(this.baseUrl + "post", value).pipe(
      map(post => {
        return post;
      })
    )
  }
}
