import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpWrapperService} from "../../../services/http/httpService";

@Component({
  selector: 'app-edit-category-item',
  templateUrl: './edit-category-item.component.html',
  styleUrls: ['./edit-category-item.component.scss']
})
export class EditCategoryItemComponent implements OnInit {

  category: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpWrapperService
  ) {
    this.route.params.subscribe(( params: Params ) => {
      let categoryID = params['id'];
      console.log(categoryID);
      this.category = this.getCategoryByID(categoryID)
    });
  }

  async getCategoryByID(_id) {

    var dataForServer = {
      proxy:{
        method : "getByID"
      },
      data : {
        _id
      }
    };

    const response = await this.httpService.postJson('api/category/generic', dataForServer);

    this.category = response.data;
  }

  ngOnInit() {}

  async updateEntity() {
    var dataForServer = {
      proxy : {
        method : "updateCategoryName"
      },
      data : this.category
    };

    const response = await this.httpService.postJson('api/category/generic', dataForServer);
    if (response.succes) {
      this.router.navigate(['/categoryList']);
    }
  }
}
