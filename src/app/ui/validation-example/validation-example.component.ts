import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-example',
  templateUrl: './validation-example.component.html',
  styleUrls: ['./validation-example.component.css']
})
export class ValidationExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero: any = {
    id:1,
    name:"",
    power:"",
    alterEgo:""
  }

  onSubmit(){

  }

}
