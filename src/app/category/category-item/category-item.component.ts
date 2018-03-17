import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  age=5;
  person = {
    age:1,
    name:''
  }

  constructor() { }


  ngOnInit() {
  }

  maresteVarsta(){
    this.person.age ++;
  }

}
