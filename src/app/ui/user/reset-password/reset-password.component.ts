import { Component, OnInit } from '@angular/core';
import { TestBed } from "@angular/core/testing";
import { async } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";


@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public paswords: {};

  ngOnInit() {
    this.paswords = {};
  }

}
