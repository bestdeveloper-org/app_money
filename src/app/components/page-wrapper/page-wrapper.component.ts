import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {
  @Input() pager: any;
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();

  totalItems = 64;
  currentPage = 4;
  smallNumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo
  }

  pageChanged(event: any): void {
    if(this.onPageChanged) {
      this.onPageChanged.emit(event)
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
