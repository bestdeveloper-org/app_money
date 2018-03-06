import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor() { }

  // public id: number,
  // public name: string,
  // public power: string,
  // public alterEgo?: string

  ngOnInit() {
  }

  list = [{nume:'aaaa'},{nume:'bbb'}];
  valoare = 0;

  helloIonut:string = '';

  add(){
    this.valoare++;
  }

  scade(){
    this.valoare--;
  }


}
