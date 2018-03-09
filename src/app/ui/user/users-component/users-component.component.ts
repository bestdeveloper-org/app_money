import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponentComponent implements OnInit {
	
	@ViewChild('model') currentForm: NgForm;
	
  constructor() { }

  ngOnInit() {
  }
  
  var model = {
    firstname : "",
    lastname : ""
  };

}
