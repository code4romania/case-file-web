import { Injectable } from '@angular/core';
import { ApiService } from '../core/apiService/api.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { UserInfo } from '../models/user-info.model';
import { ApiListResponse } from '../models/api-list-response.model';
import { User } from '../models/user.model';
import { TokenService } from '../core/token/token.service';

@Injectable()
export class UsersService {
    private baseUrl: string;
    selectedUser: UserInfo;
    user: User;
    currentUser: UserInfo;
    _verified2FA: boolean = false;
    public verified2FAKey = 'verified2FA';   

    constructor(private http: ApiService, private tokenService: TokenService) {
      this.baseUrl = environment.apiUrl;
    }

    // firstTimeAfterLogin: boolean = false
    public loadCurrentUserInfo() {
        const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/user/info');
        return this.http.get<UserInfo>(url);
    }

    public logout(): void {
      this.tokenService.token = undefined;
      this.verified2FA = false;      
    }

    public set verified2FA(value: boolean) {
      this._verified2FA = value;
      if (value === true){
        localStorage.setItem(this.verified2FAKey, value.toString());
      } else {
        localStorage.removeItem(this.verified2FAKey);
      }
    }
    public get verified2FA() {
      if (localStorage.getItem(this.verified2FAKey) != undefined)
        return JSON.parse(localStorage.getItem(this.verified2FAKey));
      else
        return false;
    }

    public loadUsers(pageNo?: number, pageSize?: number)
    {
      var url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/user');

      if (pageNo > 0 && pageSize > 0) {
        url = Location.joinWithSlash(this.baseUrl, `/api/v1/user?Page=${pageNo}&PageSize=${pageSize}`);
      }

      return this.http.get<ApiListResponse<UserInfo>>(url).pipe();
    }

    public loadUsersCount() {
      const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/user/count');
      return this.http.get<number>(url).pipe();
    }

    public searchUsers(name: string, pageNo?: number, pageSize?: number) {
      var url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/user?Name=${name}`);

      if (pageNo > 0 && pageSize > 0) {
        url = Location.joinWithSlash(this.baseUrl, `/api/v1/user?Name=${name}&Page=${pageNo}&PageSize=${pageSize}`);
      }

      return this.http.get<ApiListResponse<UserInfo>>(url).pipe();
    }

    public addNewUser(user: User) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/user`);
      return this.http.post(url, user);
    }
  
    public saveChanges(user: User, info: User) {
      const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/user');
      return this.http.put(url, { ...user, userId: info.userId });
    }

    public getUser(userId: number) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/user/${userId}`);
      return this.http.get<User>(url);
    }

    public deleteUser(userId: number) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/user/deactivate`);
      return this.http.post(url, userId);
    }

    public forgotPassword(email: string) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/access/forgot-password`);
      return this.http.post<any>(url, { email: email });
    }

    public resetPassword(token: string, password: string, confirmPassword: string) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/access/reset-password`);
      return this.http.post<any>(url, { token: token, password: password, confirmPassword: confirmPassword });
    }

    public changePassword(password: string, confirmPassword: string) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/user/reset`);
      return this.http.post<any>(url, { newPassword: password, confirmPassword: confirmPassword });
    }

    public verifyToken2FA(token: string) {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/access/verify`);
      return this.http.post<any>(url, { token: token });
    }

    public resendToken2FA() {
      const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/access/resend`);
      return this.http.post<any>(url, null);
    }
}