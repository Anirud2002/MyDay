import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../../../_services/account.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  faArrowRightFromBracket = faArrowRightFromBracket;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
  }

}
