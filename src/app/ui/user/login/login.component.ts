import { Component, OnInit} from '@angular/core';
import {User} from './user.interface';
import {HttpWrapperService} from "../../../services/http/httpService";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private httpService: HttpWrapperService){

  }
  async onSubmit(){
    var request = {
      login:this.user.email,
      password:this.user.password,
    };
    const serverResponse = await this.httpService.postJson("api/pub/security/login",request);

    console.log(serverResponse);
  }
  public user: User;


  ngOnInit() {
  this.user = {
    email:'',
    password:''
  }
  }
}











