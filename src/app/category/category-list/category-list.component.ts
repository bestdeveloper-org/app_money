import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import {Category} from "../category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  category: Category = null;

  categoryList: Array<Category> = [];


  constructor() { }

  ngOnInit() {

  }

  showAddCategoryScreen()
  {
    this.category = new Category();
  }


  add(){
    if(this.category == null)
    {
      return;
    }
    this.category.id = UUID.UUID();
    this.categoryList.push(this.category);
    this.category = null;
  }

}
