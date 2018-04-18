import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: "app-categoryItemEdit",
  templateUrl: "./categoryItemEdit.component.html",
  styleUrls: ["./categoryItemEdit.component.scss"]
})
export class CategoryItemEditComponent implements OnInit {
  @Input() category: Category;
  @Output()
  notifyStartEdit: EventEmitter<Category> = new EventEmitter<Category>();
  @Output()
  notifyStartDelete: EventEmitter<Category> = new EventEmitter<Category>();
  constructor() {}

  ngOnInit() {}
  startEditCategory() {
    this.notifyStartEdit.emit(this.category);
  }
}
