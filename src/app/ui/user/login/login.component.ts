import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators,NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  // myform: FormGroup;
  // email: FormControl;
  // password: FormControl;
  @ViewChild('heroForm') currentForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  ui : any = {
  email:"",
    password:""
};

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero: any = {
    id:1,
    name:"",
    power:"",
    alterEgo:""
  }

  validateInput(ctrlName){
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  onSubmit(){
    debugger;
    let isFormValid = this.currentForm.valid;

    isFormValid = this.validateInput("name");
    if(!isFormValid){
      return;
    }

  }
}







