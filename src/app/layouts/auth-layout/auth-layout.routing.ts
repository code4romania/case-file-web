import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/account/login/login.component';
import { ResetPasswordComponent } from '../../pages/account/reset-password/reset-password.component';
import { TwoFAComponent } from '../../pages/account/2fa/2fa.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: '2fa', component: TwoFAComponent }
];
