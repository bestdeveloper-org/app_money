import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  providers: [BsModalService]
})
export class ConfirmPopupComponent implements OnInit {

  @Input() title: string = 'Modal with component';
  @Input() message: string = 'Message here...';
  @Output() action = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  public clickOk() {
    //https://github.com/valor-software/ngx-bootstrap/issues/2290
    console.log("Click ok...");
    this.action.emit(true);
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}
