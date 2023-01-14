import { Component, OnInit } from '@angular/core';
import { faDollar, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  faDollar = faDollar
  faComment = faComment
  constructor() { }

  ngOnInit(): void {
  }

}
