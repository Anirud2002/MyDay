import { Component, OnInit } from '@angular/core';
import { AuthCheckService } from './_services/auth-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyDay.Client';

  constructor(private authCheckService: AuthCheckService){}
  
  ngOnInit(){
    this.authCheckService.isLoggedIn();
  }
}
