import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import {Category} from "../category";
import {HttpWrapperService} from "../../services/http/httpService";
import { Observable } from 'rxjs/Observable';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ConfirmPopupComponent} from "../confirm-popup/confirm-popup.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  category: Category = null;
  selectedCategory: Category = null;

  categoryList: Array<Category> = [];
  message:string ="";
  bsModalRef: BsModalRef;
  constructor(private httpService: HttpWrapperService, private modalService: BsModalService) { }

  async ngOnInit() {
    // this.categoryList = await this.getCategoriesFromDb();

    const resp = await this.getPagedCategories();
    //this.categoryList = await this.getPagedCategories();

  }

  showAddCategoryScreen()
  {
    this.category = new Category();
  }


  add(){
    const existentCategory = this.categoryList.find(it=>it.name === this.category.name);
    if(existentCategory){
      this.message = "Category exists";
      return;
    }
    this.message = "";


    if(this.category == null)
    {
      return;
    }
    const reg = /[^A-Za-z0-9]+/g;
    this.category.id = UUID.UUID();
    this.category.added = new Date();
    this.categoryList.push(this.category);
    this.saveCategoryToDatabase(this.category);

    this.category = null;
  }

  startEditCategory(categoryItem){
    this.selectedCategory = {...categoryItem} ;
    // this.selectedCategory = categoryItem;
  }

  startDeleteCategory(item){
    this.bsModalRef = this.modalService.show(ConfirmPopupComponent, {class: 'modal-lg'});
    console.log(this.bsModalRef);
    this.bsModalRef.content.title = 'New Client';

    this.bsModalRef.content.action.take(1).subscribe((value) => {
      console.log(value); // here you will get the value

      this.httpService.postJson("api/delete/category", item );
      this.categoryList = this.categoryList.filter(el=>el.id != item.id);

    });


    // this.categoryList = this.categoryList.filter(el=>el.id != item.id);
  }

  saveSelectedCategory(){
    let category = this.categoryList.find(it=>it.id === this.selectedCategory.id);
    category = {...category, name: this.selectedCategory.name};

    const categoryIndex = this.categoryList.findIndex(it=>it.id === this.selectedCategory.id);

    this.categoryList[categoryIndex] = category;

    this.saveCategoryToDatabase(category);

    this.selectedCategory = null;
  }

  saveCategoryToDatabase(category){
    if(this.categoryList.length === 0){
      return;
    }

    var dataForServer = {
      proxy:{
        "method":"add_edit"
      },
      "data":category
    };

    const dbResp =  this.httpService.postJson("api/category/generic",dataForServer);

    console.log(dbResp);

  }

  async getCategoriesFromDb() : Promise<Array<Category>> {
        var dataForServer = {
      proxy:{
        "method":"get"
      },
      "data":{}
    };

    const dbResult =  await this.httpService.postJson("api/category/generic",dataForServer);


    console.log(dbResult);
    const arr : Category[] = [];
    arr.push(...dbResult.data );

    return arr;
  }

  pager = {
    pageNo: 1,
    itemsOnPage: 2,
    pageCount: 0,
    count: 0,
    items: []
  };


  async getPagedCategories() {
    const data= {
      pager: this.pager,
      filter: {
      }
    };

    const body :any = {};
    body.proxy = {
      method: 'getCategoryPages',
    };
    body.data = data;

    const resp =   this.httpService.postJsonObs('api/category/generic', body)
      .map((response : any) => response.json())
      .subscribe((resp:any) => {
        this.pager.count = resp.data.count;
        this.pager.pageCount = 0;

        this.pager.pageCount = Math.floor(this.pager.count / this.pager.itemsOnPage)+1;

        this.pager.items = resp.data.items;
        this.categoryList = resp.data.items;
      });


  }

  async pageChanged(data)
  {
    this.pager.pageNo = data.page;
    this.getPagedCategories();
  }

}
