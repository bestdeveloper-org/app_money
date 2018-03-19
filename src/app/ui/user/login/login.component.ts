import { Component, OnInit} from '@angular/core';
import {User} from './user.interface';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;


  ngOnInit() {
  this.user = {
    email:'',
    password:''
  }
  }
}











