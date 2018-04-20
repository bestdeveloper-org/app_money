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

  order: any;

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.order)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.order = params.order;
        console.log(this.order); // popular
      });
  }

}
