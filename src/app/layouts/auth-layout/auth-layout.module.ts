import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/account/login/login.component';
import { ResetPasswordComponent } from '../../pages/account/reset-password/reset-password.component';
import { TwoFAComponent } from '../../pages/account/2fa/2fa.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    TwoFAComponent
  ]
})
export class AuthLayoutModule { }
