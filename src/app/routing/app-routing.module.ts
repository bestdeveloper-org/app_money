import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidationExampleComponent } from '../ui/user/validation-example/validation-example.component';
import { SuccessfulResetComponent } from '../ui/user/successful-reset/successful-reset.component';
import {LoginComponent} from "../ui/user/login/login.component";
import {ChangePasswordComponent} from "../ui/user/change-password/change-password.component";
import {CreateUserComponent} from "../ui/user/create-user/create-user.component";


const routes: Routes = [
  { path: 'reset-password', component: ValidationExampleComponent },
  { path: 'successful-reset', component: SuccessfulResetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validationexample', component: ValidationExampleComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'createUser', component: CreateUserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
