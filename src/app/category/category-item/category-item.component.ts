import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../category";

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  @Input() category:Category;
  @Output() notifyStartEdit: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() notifyStartDelete: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() { }


  ngOnInit() {
  }

  startEditCategory(){
    this.notifyStartEdit.emit(this.category);
  }

  customClass = '';

  onMouseEnter(ev){
    this.customClass  = 'over';
  }

  onMouseLeave(ev){
    this.customClass  = '';
  }

  tryDelete(){
    this.notifyStartDelete.emit(this.category);
  }

}
