import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: './assets/img/icons/common/dashboard.png', class: '' },
    { path: '/beneficiary-info', title: 'Adaugă un beneficiar',  icon:'./assets/img/icons/common/add_beneficiary.png', class: '' },
    { path: '/beneficiars', title: 'Listă beneficiari',  icon:'./assets/img/icons/common/beneficiars.png', class: '' },
    { path: '/forms', title: 'Management formulare',  icon:'./assets/img/icons/common/forms1.png', class: '' },
    { path: '/users', title: 'Utilizatori',  icon:'./assets/img/icons/common/users.png', class: '' },
    { path: '/statistics', title: 'Rapoarte',  icon:'./assets/img/icons/common/statistics.png', class: '' },
    { path: '/settings', title: 'Setări',  icon:'./assets/img/icons/common/settings.png', class: '' },
    { path: '/ngo', title: 'Solicitări',  icon:'./assets/img/icons/common/forms1.png', class: '' }   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

   this.usersService.loadCurrentUserInfo().subscribe(result => 
    { 
      this.usersService.currentUser = result;
      
      if (this.usersService.currentUser == undefined || this.usersService.currentUser.role != 2){
        this.menuItems = this.menuItems.filter(menuItem => menuItem.title != "Solicitări")
      }
    });    

  }
}
