import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from '../../../../_interfaces/user-details.modal';
import { User } from '../../../../_interfaces/user.modal';
import { AccountService } from '../../../../_services/account.service';
import { FormGroup, FormBuilder } from  '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user:User;
  userDetails: UserDetails;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faPencil = faPencil;
  faXmark = faXmark;
  
  // boolean to check if user has hovered over the input and show the edit button
  showEditBtn: boolean = false;

  nameEdit: boolean = false;
  cityEdit: boolean = false;
  descEdit: boolean = false;

  // booleans to show or hide the edit buttons for each input
  showNameEditBtn: boolean = false;
  showCityEditBtn: boolean = false;
  showDescEditBtn: boolean = false;

  profileForm: FormGroup;
  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  async ngOnInit() {
    await this.getUserDetails();
    this.profileForm = this.fb.group({
      fullName: [''],
      city: [''],
      description: [''],
    })
  }

  async getUserDetails(){
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
    })
    this.userDetails = await this.accountService.getUserDetails(this.user.userName) as UserDetails;
  }

  doSmth(){
    this.nameEdit = false;
  }

  handleInputEdit(type: string){
    switch(type){
      case "name": {
        this.nameEdit = true;
        this.profileForm.patchValue({fullName: ""})
        break;
      }
      case "city": {
        this.cityEdit = true;
        this.profileForm.patchValue({city: ""})
        break;
      }
      case "desc": {
        this.descEdit = true;
        this.profileForm.patchValue({description: ""})
        break;
      }
    }
  }

  handleClearInput(type: string){
    switch(type){
      case "name": {
        if(!(this.profileForm.get("fullName").value as string)){
          this.nameEdit = false;
        }
        this.profileForm.patchValue({fullName: ""})
        break;
      }
      case "city": {
        if(!(this.profileForm.get("city").value as string)){
          this.cityEdit = false;
        }
        this.profileForm.patchValue({city: ""})
        break;
      }
      case "desc": {
        if(!(this.profileForm.get("description").value as string)){
          this.descEdit = false;
        }
        this.profileForm.patchValue({description: ""})
        break;
      }
    }
  }

  logout(){
    this.accountService.logout();
  }
}
