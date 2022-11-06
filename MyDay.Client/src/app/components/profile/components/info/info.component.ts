import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faPencil } from '@fortawesome/free-solid-svg-icons';
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
  
  // boolean to check if user has hovered over the input and show the edit button
  showEditBtn: boolean = false;

  nameEdit: boolean = false;
  cityEdit: boolean = false;
  descEdit: boolean = false;

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

  handleInputEdit(type: string){
    switch(type){
      case "name": {
        this.nameEdit = true;
        break;
      }
      case "city": {
        this.cityEdit = true;
        break;
      }
      case "desc": {
        this.descEdit = true;
        break;
      }
    }
  }

  logout(){
    this.accountService.logout();
  }
}
