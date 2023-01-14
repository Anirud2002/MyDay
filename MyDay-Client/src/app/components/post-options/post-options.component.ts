import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {
  @Input() post;
  @Output() postDeleteEvent = new EventEmitter();
  faPencil = faPencil;
  faTrash = faTrash;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  async deletePost(postDesc){
    try {
      const response = await this.postService.deletePost(postDesc.postID, postDesc.postedOn);
      response.subscribe(res => {
        // do nothing
        this.postDeleteEvent.emit(postDesc.postID)
      })
    } catch (error) {
      console.log("There was an error!", error)
    }
  }

}
