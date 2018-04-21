import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pager-wrapper',
  templateUrl: './pager-wrapper.component.html',
  styleUrls: ['./pager-wrapper.component.scss']
})
export class PagerWrapperComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() pager: any;
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();

  totalItems = 64;
  currentPage = 4;
  smallnumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    if(this.onPageChanged){
      this.onPageChanged.emit(event);
    }

  }
}
