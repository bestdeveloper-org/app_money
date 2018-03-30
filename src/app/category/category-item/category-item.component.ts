import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../category";

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  customClass: string = '';

  @Input() category: Category;
  @Output() notifyStartEdit: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() notifyStartDelete: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  startEditCategory(){
    this.notifyStartEdit.emit(this.category);
  }

  mouseEnter() {
    this.customClass = 'over';
  }

  mouseLeave() {
    this.customClass = '';
  }

  delete() {
    this.notifyStartDelete.emit(this.category);
  }
}
