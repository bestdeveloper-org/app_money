import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidationExampleComponent } from '../ui/user/validation-example/validation-example.component';
import { SuccessfulResetComponent } from '../ui/user/successful-reset/successful-reset.component';
import {LoginComponent} from "../ui/user/login/login.component";
import {ChangePasswordComponent} from "../ui/user/change-password/change-password.component";
import {CreateUserComponent} from "../ui/user/create-user/create-user.component";
import {CategoryListComponent} from "../category/category-list/category-list.component";
import {UsersComponentComponent} from "../ui/user/users-component/users-component.component";
import {EditCategoryItemComponent} from "../category/category-item/edit-category-item/edit-category-item.component";


const routes: Routes = [
  { path: 'successful-reset', component: SuccessfulResetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validationExample', component: ValidationExampleComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'categoryList', component: CategoryListComponent },
  { path: 'usersComponent', component: UsersComponentComponent},
  { path: 'categoryEdit', component: EditCategoryItemComponent}
 ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
