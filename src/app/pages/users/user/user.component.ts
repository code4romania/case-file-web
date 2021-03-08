import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  userId: number;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }
    
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      });
    //console.log(this.userId);

    if (this.userId == undefined) {
      this.usersService.user = undefined;
    }
    
    if(this.usersService.user)
    {
      this.title = "Editează utilizator";
      this.user = this.usersService.user;      
      this.user.types = this.user.types != null ? this.user.types.map(String) : null;
      var date = new Date(this.user.birthDate);      
      this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    else {
      this.title = "Adaugă utilizator nou";
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
    console.log(this.user);
    if (this.user.role == undefined || this.user.role == -1) {
      alert ("Vă rugăm alegeți un rol pentru acest utilizator.");
    }
    else if (this.user.name == undefined || this.user.name == "")
    {
      alert ("Vă rugăm completați un nume pentru acest utilizator.");
    }
    else if (this.user.email == undefined || this.user.email == "")
    {
      alert ("Vă rugăm completați o adresă de email pentru acest utilizator.");
    }
    else if (this.user.phone == undefined || this.user.phone == "")
    {
      alert ("Vă rugăm introduceți un număr de telefon pentru acest utilizator.");
    }
    else if (this.user.birthDate == undefined)
    {
      alert ("Vă rugăm completați data nașterii pentru acest utilizator.");
    }
    else {
      this.user.types = this.user.types != null ? this.user.types.map(Number) : null;              
    // this.user.birthDate = this.birthDate;
      this.usersService.user = this.user;
      //console.log(this.user);

      if(this.user.userId > 0)
      {
        this.usersService.saveChanges(this.user, this.user).subscribe((result)=>{
          //console.log(result);        
          //console.log(this.usersService.user);
          this.router.navigate(['/user-profile', this.user.userId]); // navigate to user details (profile + allocated beneficiaries list)
        });
      }
      else
      {
        this.usersService.addNewUser(this.usersService.user).subscribe((result)=>{
          //console.log(result);
          this.usersService.user.userId = result as number;
          //console.log(this.usersService.user);
          this.router.navigate(['/users']);
        });
      }
    }
  }
}
