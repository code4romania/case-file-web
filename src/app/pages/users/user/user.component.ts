import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {  
  user: User;
  birthDate: string;
  title: string;
  dateModel: NgbDateStruct;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {    
    
    if(this.usersService.user)
    {
      this.title = "Editeaza utilizator";
      this.user = this.usersService.user;      
      this.user.types = this.user.types != null ? this.user.types.map(String) : null;
      var date = new Date(this.user.birthDate);      
      this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    else {
      this.title = "Adauga utilizator nou";
      this.user = <User>{};
      this.user.role = -1;
      this.user.types = [-1];
    }
  }

  onDateSelect(evt:any) {
    // todo!!! improve this
    var day = evt.day + 1;
    this.user.birthDate = new Date(evt.year + '/' + evt.month + '/' + day);    
  }

  userInfoAdded()
  {    
    this.user.role = +this.user.role;        
    // this.user.birthDate = this.birthDate;
    this.user.types = this.user.types != null ? this.user.types.map(Number) : null;
    this.usersService.user = this.user;
    console.log(this.user);

    if(this.user.userId > 0)
    {
      this.usersService.saveChanges(this.user, this.user).subscribe((result)=>{
        console.log(result);        
        console.log(this.usersService.user);
        this.router.navigate(['/user-profile', this.user.userId]); // navigate to user details (profile + allocated beneficiaries list)
      });
    }
    else
    {
      this.usersService.addNewUser(this.usersService.user).subscribe((result)=>{
        console.log(result);
        this.usersService.user.userId = result as number;
        console.log(this.usersService.user);
        this.router.navigate(['/users']);
      });
    }
  }
}
