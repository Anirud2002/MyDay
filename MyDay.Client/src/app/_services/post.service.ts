import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  async myDayPost(value: any){
    return this.http.post(this.baseUrl + "post/myday", value).pipe(
      map(post => {
        return post;
      })
    )
  }
}
