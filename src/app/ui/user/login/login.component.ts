import { Component, OnInit} from '@angular/core';
import {User} from './user.interface';
import {HttpWrapperService} from "../../../services/http/httpService";
import {PubSubService} from "../../../services/pubsub/pubsub";
import {AuthService} from "angular2-social-login";
import {LocalStorageService} from "angular-2-local-storage";
import {Router} from "@angular/router";


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


  constructor(private httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private pubSubService: PubSubService){
  }


  serverData : any = null;

  async onSubmit(){
    var request = {
      login: this.user.email,
      password: this.user.password
    };

    this.serverData = await this.httpService.postJson("api/pub/security/login",request);

    this.localStorageService.add('user',this.serverData.data);
    this.pubSubService.publish("login", this.serverData.data);
    this.router.navigate(['/login']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});

    console.log(this.serverData);
  }

  ngOnInit() {

     }


  }
}











