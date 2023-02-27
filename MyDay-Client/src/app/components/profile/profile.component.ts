import { Component, OnInit } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  response:string;
  showModal: boolean = false;

  faPencil = faPencil;
  currentTab: string = "info";

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

  uploadMainPic(){
    this.showModal = true;
    // this.uploader.response.subscribe( res => this.response = res );
  }

  closeModal(e){
    if(e) this.showModal = false;
  }

}
