import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpWrapperService } from "../../../services/http/httpService";
import { NgForm } from "@angular/forms";
import { AuthService } from "angular2-social-login";
import { LocalStorageService } from "angular-2-local-storage";
import { PubSubService } from "../../../services/pubsub/pubsub";
import { Router } from "@angular/router";

import language from "../../../facade/language";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"]
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {}

  private text: string;
  private httpService: HttpWrapperService;
  public user;
  sub: any;
  public mask = [
    "(",
    /[0-9]/,
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/
  ];

  ui: any = {
    companyLogo: null,
    companyName: "",
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    userOrCompany: 0,
    allowLogo: false
  };

  formErrors = {
    email: "",
    password: ""
  };

  @ViewChild("createUserForm") currentForm: NgForm;

  email = "";
  password = "";
  uiMessage = "";

  constructor(
    public _auth: AuthService,
    httpService: HttpWrapperService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private pubSubService: PubSubService
  ) {
    this.httpService = httpService;
    this.text = 'console.log("start");';
  }

  validateEmail(emailValue) {
    if (!emailValue) {
      this.formErrors.email = "Email";
      return false;
    }
    this.formErrors.email = "";
    return true;
  }

  validatePassword(passwordValue) {
    if (!passwordValue) {
      this.formErrors.password = "Parola";
      return false;
    }
    this.formErrors.password = "";
    return true;
  }

  createUserOk(resp) {
    this.localStorageService.add("user", resp.data);
    this.pubSubService.publish("login", resp.data);
    this.router.navigate(["/login"]);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: 'sd' }});
  }

  loginFailure() {}

  markAsDirty(ctrlName, dirty = true) {
    this.currentForm.controls[ctrlName].markAsDirty({ onlySelf: dirty });
  }

  validateInput(ctrlName) {
    this.currentForm.controls[ctrlName].markAsDirty();
    return this.currentForm.controls[ctrlName].valid;
  }

  async submitForm() {
    this.uiMessage = "";

    let isOk = true;
    let isCtrlValid = false;
    isCtrlValid = this.validateInput("firstName");
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput("lastName");
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput("phone");
    if (!isCtrlValid) {
      isOk = false;
    }

    if (this.ui.userOrCompany === 0) {
      this.markAsDirty("numeFirma", false);
      this.markAsDirty("allowLogo", false);
    } else {
      this.markAsDirty("numeFirma");
      this.markAsDirty("allowLogo");
    }

    isCtrlValid = this.validateInput("email");
    if (!isCtrlValid) {
      isOk = false;
    }
    isCtrlValid = this.validateInput("password");
    if (!isCtrlValid) {
      isOk = false;
    }

    if (!isOk) {
      return;
    }
    const formData: FormData = new FormData();

    if (this.ui.companyLogo) {
      const fileName = this.ui.companyLogo.name;
      if (fileName) {
        formData.append("1", this.ui.companyLogo, fileName);
      }
    }

    const proxy: any = {
      module: "security",
      method: "createUser"
    };

    const newUI: any = { ...this.ui };
    delete newUI.companyLogo;
    formData.append("data", JSON.stringify(newUI));

    formData.append("proxy", JSON.stringify(proxy));
    // formData.append('q', JSON.stringify(q));
    // formData.append('timer', JSON.stringify(this.question.timer));

    // if (this.question.code) {
    //   formData.append('code', this.question.code);
    // }

    const resp = await this.httpService.postFormData("api/pub/form", formData);

    const respData = resp.data;
    if (!respData.success) {
      this.uiMessage = language.lang[respData.message];
      return;
    }

    this.createUserOk(respData);
  }

  ngOnDestroy() {
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }
}
