import { Component } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faQuestion = faQuestion
  title = 'MyDay.Client';

  toggleInfoSection(){
    const infoSection = document.querySelector(".info-section")
    infoSection?.classList.toggle("reveal")
  }
}
