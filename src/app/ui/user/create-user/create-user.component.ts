import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpWrapperService} from '../../../services/http/httpService';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angular2-social-login';
import {LocalStorageService} from 'angular-2-local-storage';
import {PubSubService} from '../../../services/pubsub/pubsub';
import {Router} from '@angular/router';

import language from '../../../facade/language';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
  }

  // tslint:disable-next-line:member-ordering
  private text: string;
  // tslint:disable-next-line:member-ordering
  private  httpService: HttpWrapperService;
  // tslint:disable-next-line:member-ordering
  public user;
  // tslint:disable-next-line:member-ordering
  sub: any;
  // tslint:disable-next-line:member-ordering
  public mask = ['(', /[0-9]/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,  /\d/];
// /^\d{4}-\d{3}-\d{3}/;
//  public mask = /^\d{4}-\d{3}-\d{3}/;

  // tslint:disable-next-line:member-ordering
  ui: any= {
    companyLogo: null,
    companyName: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    userOrCompany: 0,
    allowLogo: false
  };

  // tslint:disable-next-line:member-ordering
  formErrors = {
    'email': '',
    'password': ''
  };

  // createUserForm: NgForm;
  // tslint:disable-next-line:member-ordering
  @ViewChild('createUserForm') currentForm: NgForm;

  // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:no-inferrable-types
  // tslint:disable-next-line:member-ordering
  email = '';
  // tslint:disable-next-line:member-ordering
  password = '';
  // tslint:disable-next-line:member-ordering
  uiMessage = '';

  constructor(public _auth: AuthService, httpService: HttpWrapperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private pubSubService: PubSubService
              // private fb: FacebookService
  )
  // tslint:disable-next-line:one-line
  {
    this.httpService = httpService;
    this.text = 'console.log("start");';

    // fb.init({
    //   appId: '1123667347736940',
    //   version: 'v2.11'
    // });
  }

  validateEmail(emailValue)
  // tslint:disable-next-line:one-line
  {
    // var controls = this.currentForm.form.controls;
    // if(!controls.email.isDirty)
    // {
    //   return true;
    // }
    if (!emailValue)
    // tslint:disable-next-line:one-line
    {
      this.formErrors.email = 'Email';
      return false;
    }
    this.formErrors.email = '';
    return true;
  }

  validatePassword(passwordValue)
  // tslint:disable-next-line:one-line
  {
    if (!passwordValue)
    // tslint:disable-next-line:one-line
    {
      this.formErrors.password = 'Parola';
      return false;
    }
    this.formErrors.password = '';
    return true;
  }

  createUserOk(resp)
  // tslint:disable-next-line:one-line
  {
    this.localStorageService.add('user', resp.data);
    this.pubSubService.publish('login', resp.data);
    this.router.navigate(['/login']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  loginFailure()
  // tslint:disable-next-line:one-line
  {

  }

  // private handleError(error) {
  //   console.error('Error processing action', error);
  // }

  markAsDirty(ctrlName, dirty = true) {
    this.currentForm.controls[ctrlName].markAsDirty({onlySelf: dirty});
  }

  validateInput(ctrlName) {
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  async submitForm()
  // tslint:disable-next-line:one-line
  {
    this.uiMessage = '';

    let isOk  = true;
    let isCtrlValid  = false;
    isCtrlValid = this.validateInput('firstName');
    if (!isCtrlValid) {isOk = false; }
    isCtrlValid = this.validateInput('lastName');
    if (!isCtrlValid) {isOk = false; }
    isCtrlValid = this.validateInput('phone');
    if (!isCtrlValid) {isOk = false; }

    if (this.ui.userOrCompany === 0) {
      this.markAsDirty('numeFirma', false);
      this.markAsDirty('allowLogo', false);
    }else {
      this.markAsDirty('numeFirma');
      this.markAsDirty('allowLogo');
    }

    isCtrlValid = this.validateInput('email');
    if (!isCtrlValid) {isOk = false; }
    isCtrlValid = this.validateInput('password');
    if (!isCtrlValid) {isOk = false; }

    if (!isOk) {
      return;
    }
// tslint:disable-next-line:no-debugger
debugger;
    const formData: FormData = new FormData();

    if (this.ui.companyLogo) {
      const fileName = this.ui.companyLogo.name;
      if (fileName) {
        formData.append('1', this.ui.companyLogo, fileName);
      }
    }

    const proxy: any = {
      module: 'security',
      method: 'createUser',
    };

    // tslint:disable-next-line:no-debugger
    debugger;
    const newUI: any = { ...this.ui};
    delete  newUI.companyLogo;
    formData.append('data', JSON.stringify(newUI));

    formData.append('proxy', JSON.stringify(proxy));
    // formData.append('q', JSON.stringify(q));
    // formData.append('timer', JSON.stringify(this.question.timer));

    // if (this.question.code) {
    //   formData.append('code', this.question.code);
    // }



    const resp = await this.httpService.postFormData('api/pub/form', formData);


    const respData = resp.data;
    if (!respData.success) {

      this.uiMessage = language.lang[respData.message];
      return;
    }

    this.createUserOk(respData);

    // this.loginOk(loginResponse);

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

}
