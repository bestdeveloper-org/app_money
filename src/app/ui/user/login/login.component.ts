import { Component, OnInit} from '@angular/core';
import {User} from './user.interface';
import {HttpWrapperService} from "../../../services/http/httpService";
import {LocalStorageService} from "angular-2-local-storage";
import {PubSubService} from "../../../services/pubsub/pubsub";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = {
    email:'',
    password:''
  };


  constructor(private httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private pubSubService: PubSubService
  )
  {
    this.httpService = httpService;
    // this.text = 'console.log("start");';
  }

  serverData : any = null;

  async onSubmit(){
    var request = {
      login: this.user.email,
      password: this.user.password
    };

    this.serverData = await this.httpService.postJson("api/pub/security/login",request);
    debugger;
    if(!this.serverData.succes) {
      return;
    }

    this.localStorageService.add('user',this.serverData.data);
    this.pubSubService.publish("login", this.serverData.data);
    this.router.navigate(['/login']);

    console.log(this.serverData);

  }

  ngOnInit() {

  }
}











