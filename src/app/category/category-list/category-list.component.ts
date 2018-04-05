import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Category } from '../category';
import { HttpWrapperService } from '../../services/http/httpService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  // message: string;

  category: Category = null;
  categoryList: Array<Category> = [];
  selectedCategory: Category = null;
  // tslint:disable-next-line:no-inferrable-types
  message: string = '';

  constructor(private httpService: HttpWrapperService) {}

  async ngOnInit() {
    // const cat = new Category();
    // cat.id = UUID.UUID();
    // cat.name = 'ion';
    // this.categoryList.push(cat);
    this.categoryList = await this.getCategoriesFromDb();
  }

  showAddCategoryScreen() {
    this.category = new Category();
  }

  add() {
    const existentCategory = this.categoryList.find(
      it => it.name === this.category.name
    );
    if (existentCategory) {
      this.message = 'Category exists';
      return;
    }
    this.message = '';
    if (this.category == null) {
      return;
    }
    const reg = /[^A-Za-z0-9]+/g;
    this.category._id = UUID.UUID();
    this.category.aded = new Date();
    this.categoryList.push(this.category);
    this.saveCategoryToDatabase(this.category);
    this.category = null;
  }
  // tslint:disable-next-line:no-trailing-whitespace

  startEditCategory(categoryItem) {
    this.selectedCategory = { ...categoryItem };
  }
  // tslint:disable-next-line:no-trailing-whitespace

  saveSelectedCategory() {
    let category = this.categoryList.find(
      it => it._id === this.selectedCategory._id
    );
    category = { ...category, name: this.selectedCategory.name };
    // editedCategory.name = this.selectedCategory.name;
    const categoryIndex = this.categoryList.findIndex(
      it => it._id === this.selectedCategory._id
    );
    this.categoryList[categoryIndex] = category;
    this.categoryList.push(this.category);
    this.saveCategoryToDatabase(category);

    this.selectedCategory = null;
  }

  saveCategoryToDatabase(category) {
    if (this.categoryList.length === 0) {
      // tslint:disable-next-line:no-trailing-whitespace
      return;
    }
    const dataForServer = {
      proxy: {
        'method': 'add_edit'
      },
      data: category
    };

    this.httpService.postJson('api/category/generic', dataForServer);
  }

  async getCategoriesFromDb(): Promise<Category[]> {
    const dataForServer = {
      proxy: {
        'method': 'get'
      },
      data: {}
    };

    const dbResult = await this.httpService.postJson(
      'api/category/generic',
      dataForServer
    );
    const arr: Category[] = [];
    arr.push(...dbResult.data);
    return arr;
  }
  startDeleteCategory(item) {
    this.categoryList =
    this.categoryList.filter(el => el._id !== item._id);
  }
}
