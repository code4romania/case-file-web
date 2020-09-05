import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public userInfo: UserInfo;

  constructor(location: Location,  private element: ElementRef, private router: Router, private usersService: UsersService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.loadCurrentUserInfo();
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  private loadCurrentUserInfo() {
    this.usersService.loadCurrentUserInfo().subscribe(result => 
      { 
        this.userInfo = result;
        this.usersService.currentUser = result; 
      });
  }

  public logout()
  {
    this.usersService.logout();
  }

}
