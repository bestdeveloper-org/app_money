import { Component, OnInit} from '@angular/core';
import {User} from './user.interface';
import {HttpWrapperService} from "../../../services/http/httpService";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  // public user: User;

  user : User = {
    email:'',
    password:''
  };


  constructor(private httpService: HttpWrapperService){
  }

  serverData : any = null;

  async onSubmit(){
    var request = {
      login: this.user.email,
      password: this.user.password
    };

    this.serverData = await this.httpService.postJson("api/pub/security/login",request);

    console.log(this.serverData);
  }

  ngOnInit() {

  }
}











