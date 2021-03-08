import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tables',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  password: string;
  confirmPassword: string;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

  }

  changePwd() {
    var errors = false;
    if (this.password == undefined || this.password == "")
    {
      errors = true;
      alert ("Vă rugăm introduceți o parolă validă.");
    }
    if (this.confirmPassword == undefined || this.confirmPassword == "")
    {
      errors = true;
      alert ("Vă rugăm confirmați parola.");
    }
    if (this.password.trim() != this.confirmPassword.trim()) 
    {
      errors = true;
      alert ("Vă rugăm confirmați corect parola.");
    }
    if (!errors) {      
      this.usersService.changePassword(this.password, this.confirmPassword).subscribe((result)=>{
        alert ("Parola a fost schimbată cu succes.");        
      });      
    }
  }

}
