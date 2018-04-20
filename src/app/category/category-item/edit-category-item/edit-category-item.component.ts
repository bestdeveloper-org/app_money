import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-edit-category-item',
  templateUrl: './edit-category-item.component.html',
  styleUrls: ['./edit-category-item.component.scss']
})
export class EditCategoryItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let categoryId = params['id'];
      console.log(categoryId);
    });
  }

}
