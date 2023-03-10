import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { UserDetails } from '../../../../_interfaces/user-details.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { AuthCheckService } from '../../../../_services/auth-check.service';

@Component({
  selector: 'app-upload-main-pic',
  templateUrl: './upload-main-pic.component.html',
  styleUrls: ['./upload-main-pic.component.css']
})
export class UploadMainPicComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() changeProfilePic = new EventEmitter();
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  user:User;

  faTimes = faTimes;
  faUpload = faUpload;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.getUser();
    this.initFileUploader();
  }

  initFileUploader(){
    this.uploader = new FileUploader({
      url: "https://localhost:5001/api/profile/upload-profile-pic",
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = file => {
      if(this.uploader.queue.length > 0){
        this.uploader.queue = [this.uploader.queue[1]];
      }
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      let photo = JSON.parse(response).profilePic
      this.changeProfilePic.emit(photo)
      this.handleCloseModal();
    }
  }


  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  handleCloseModal(){
    this.closeModal.emit(true)
  }

}
