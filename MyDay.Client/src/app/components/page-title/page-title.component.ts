import { Component, OnInit } from '@angular/core';
import { GetCurrentPageService } from '../../_services/get-current-page.service';
@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {
  activePage: any;

  constructor(private getCurrentPageService: GetCurrentPageService) { }

  ngOnInit(): void {
    this.getCurrentPageService.getActivePageObservable().subscribe(res => {
      this.activePage = res;
    })
  }

}
