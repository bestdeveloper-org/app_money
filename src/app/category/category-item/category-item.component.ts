import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../category";

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() category:Category;
  @Output() notifyStartEdit: EventEmitter<Category> = new EventEmitter<Category>();

  age=5;
  person = {
    age:1,
    name:''
  };

  constructor() { }


  ngOnInit() {
  }

  maresteVarsta(){
    this.person.age ++;
  }

  startEditCategory(){
    this.notifyStartEdit.emit(this.category);
  }
}
