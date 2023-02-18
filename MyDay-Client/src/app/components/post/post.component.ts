import { Component, Input, OnInit } from '@angular/core';
import { PostReponse } from '../../_interfaces/post-response.modal';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: PostReponse
  constructor() { }

  ngOnInit(): void {
  }

}
