import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-category-item',
  templateUrl: './edit-category-item.component.html',
  styleUrls: ['./edit-category-item.component.scss']
})
export class EditCategoryItemComponent implements OnInit {
  @Input() category: string;

  constructor() { }

  ngOnInit() {
  }

}
