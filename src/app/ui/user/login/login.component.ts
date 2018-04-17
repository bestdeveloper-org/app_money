import { PubSubService } from "./../../../services/pubsub/pubsub";
import { Component, OnInit } from "@angular/core";
import { User } from "./user.interface";
import { HttpWrapperService } from "../../../services/http/httpService";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
  // router: any;
  // pubSubService: any;
  // localStorageService: any;
  // public user: User;

  user: User = {
    email: "",
    password: ""
  };

  constructor(
    private httpService: HttpWrapperService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private pubSubService: PubSubService
  ) {}

  serverData: any = null;

  async onSubmit() {
    const request = {
      login: this.user.email,
      password: this.user.password
    };

    this.serverData = await this.httpService.postJson(
      "api/pub/security/login",
      request
    );
    if (!this.serverData.success) {
      return;
    }

    console.log(this.serverData);
    this.createLogin(this.serverData);
  }

  createLogin(
    // tslint:disable-next-line:member-ordering
    resp // tslint:disable-next-line:one-line
  ) {
    this.localStorageService.add("user", resp.data);
    debugger;
    this.pubSubService.publish("login", resp.data);
    this.router.navigate(["/"]);
    //   this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  ngOnInit() {}
}
