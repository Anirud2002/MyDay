import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-main-pic',
  templateUrl: './upload-main-pic.component.html',
  styleUrls: ['./upload-main-pic.component.css']
})
export class UploadMainPicComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  
  faTimes = faTimes;
  faUpload = faUpload;
  constructor() { }

  ngOnInit(): void {
    this.initFileUploader();
  }

  initFileUploader(){
    this.uploader = new FileUploader({
      url: "https://localhost:5001",
      authToken: 'Bearer ',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response){
        const photo = JSON.parse(response);
      }
    }
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  handleCloseModal(){
    this.closeModal.emit(true)
  }

}
