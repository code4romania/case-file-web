import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/apiService/api.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/token/token.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private baseUrl: string;

  constructor(private http: ApiService, private router: Router, private tokenService: TokenService, private usersService: UsersService) {
      this.baseUrl = environment.apiUrl;
  }
  
  email: string;
  password: string;

  invalid: boolean;

  loginSubscription: Subscription;

  firstLogin: boolean;

  tryLogin() {
    if (this.loginSubscription) {
        this.loginSubscription.unsubscribe();
    }
    const authUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/access/authorize');
    this.loginSubscription = this.http.post<{access_token: string, expires_in: number, first_login: boolean}>(authUrl, {
        email: this.email,
        password: this.password
    })
        .subscribe(res => {
            this.tokenService.token = res.access_token;
            this.firstLogin = res.first_login;

            if (this.firstLogin) {
              this.router.navigate(['/reset-password']);
            }
            else {
              this.usersService.loadCurrentUserInfo().subscribe(result => 
              { 
                this.usersService.currentUser = result; 
                this.router.navigate(['/2fa']);
              }); 
            }           
        }, () => {
            this.invalid = true;
        });
}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  forgotPwd() {
    if (this.email == null || this.email.length === 0){
      alert("Va rugam introduceti o adresa de email valida.");
    }
    else{
      this.usersService.forgotPassword(this.email).subscribe((result)=>{
        alert(result.message);        
      });
    }
  }

}
