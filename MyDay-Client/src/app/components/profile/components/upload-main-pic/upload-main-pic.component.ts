import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-main-pic',
  templateUrl: './upload-main-pic.component.html',
  styleUrls: ['./upload-main-pic.component.css']
})
export class UploadMainPicComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

  handleCloseModal(){
    this.closeModal.emit(true)
  }

}
