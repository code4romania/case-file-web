import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList: UserInfo[];
  pageSize = 10;
  totalCount = 0;
  currentUser: UserInfo;
  page = 1;
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    // this.currentUser = this.usersService.currentUser;
    this.loadUsers(1, this.pageSize);
  }

  private loadUsers(pageNo: number, pageSize: number) {
    this.usersService.loadCurrentUserInfo().subscribe(result => 
      { 
        this.currentUser = result;
        this.usersService.currentUser = result;

        this.usersService.loadUsers(pageNo, pageSize).subscribe((result)=>{
        this.usersList = result.data;
        this.totalCount = result.totalItems;
      });
    });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadUsers(this.page, this.pageSize);
  }

  public async userSelected(user: UserInfo): Promise<void> {    
    //console.log(user);    
    this.usersService.selectedUser = user;
  }

  public async addUser(): Promise<void> {         
    this.usersService.user = null;
  }

  public search(value: string)
  {
    this.usersService.searchUsers(value, this.page, this.pageSize).subscribe((result)=>{
      this.usersList = result.data;
      this.totalCount = result.totalItems;
    });
  }

  public async deleteUser(user: UserInfo): Promise<void> {    
    if(confirm("Esti sigur ca vrei sa dezactivezi contul utilizatorului " + user.name + "?")) {
      this.usersService.deleteUser(user.userId).subscribe((result)=>{
        if (result === true)
        {
          this.loadUsers(this.page, this.pageSize);
        }
        
      });
    }
  }
  
}
