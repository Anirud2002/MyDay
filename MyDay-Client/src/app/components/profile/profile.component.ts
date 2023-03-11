import { Component, OnInit } from '@angular/core';
import { faPencil, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Subject } from 'rxjs';
import { UserDetails } from '../../_interfaces/user-details.modal';
import { User } from '../../_interfaces/user.modal';
import { AccountService } from '../../_services/account.service';
import { ProfileService } from '../../_services/profile.service';

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
  userDetails: UserDetails;
  user: User;
  isFetchingUserDetails: boolean = true;

  faPencil = faPencil;
  faUserCircle = faUserCircle;

  currentTab: string = "info";

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService
    ) { }

  async ngOnInit() {
    this.isFetchingUserDetails = true;
    this.userDetails = await this.getUserDetails()
    .then((res) => {
      this.isFetchingUserDetails = false;
      return res;
    })
    .catch(err => {
      this.isFetchingUserDetails = false;
      console.log(err);
      return null;
    });
  }

  async getUserDetails(){
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })
    return await this.accountService.getUserDetails(this.user.userName) as UserDetails;
  }

  uploadMainPic(){
    this.showModal = true;
  }

  closeModal(e){
    if(e) {
      this.showModal = false;
    }
  }

  changeProfilePic(e){
    if(e){
      this.userDetails.profilePic = e
    }else{
      this.userDetails.profilePic = {
        url: null,
        publicID: null
      };
    }
    this.profileService.updateProfilePic(this.userDetails.profilePic);
  }
}
