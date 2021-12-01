import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';
import { PageSignUpComponent } from './pages/page-sign-up/page-sign-up.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { SignInFormComponent } from './component/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './component/sign-up-form/sign-up-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageSignInComponent,
    PageSignUpComponent,
    PageResetPasswordComponent,
    PageForgotPasswordComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
