import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myform: FormGroup;
  email: FormControl;
  password: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
      this.email = new FormControl('',[
        Validators.required,
        Validators.pattern("[/^ @]*@[^ @]*")]);
      this.password = new FormControl('', [
         Validators.required,
         Validators.minLength(8)
    ]);
    }

  createForm() {
    this.myform = new FormGroup({
        email: this.email,
        password: this.password
      });
  }
}







