import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;
  constructor() { }

  ngOnInit(): void {
  }

}
