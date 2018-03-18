import {Component, OnInit} from '@angular/core';
import { FormsModule }  from '@angular/forms';
import {LocalStorageService} from "angular-2-local-storage";
import {PubSubService} from "./services/pubsub/pubsub";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  user: any = null;
  constructor(
    private localStorageService: LocalStorageService,
    private pubSubService: PubSubService
  ){

  }

  ngOnInit(): void {
    this.user = this.localStorageService.get('user');

    this.pubSubService.subscribe('login', (val)=>{
      this.user = val;

    });
  }

  logout()
  {
    this.localStorageService.set('user',null);
    this.user = null;
  }


}
