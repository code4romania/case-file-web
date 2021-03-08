import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {  
  token: string;
  password: string;
  confirmPassword: string;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {    
    this.route.params.subscribe(params => {
      this.token = params['token'];
      });
    //console.log(this.token);
    
  }

  resetPwd() {
    var errors = false;
    if (this.password == null || this.password.length === 0) {
      errors = true;
      alert("Vă rugăm introduceți o parolă validă.");
    }
    if (this.confirmPassword == null || this.confirmPassword.length === 0) {
      errors = true;
      alert("Vă rugăm confirmați parola.");
    }
    if (this.password != this.confirmPassword) {
      errors = true;
      alert("Vă rugăm confirmați corect parola.");
    }
    if (!errors) {
      if (this.token != null && this.token.length > 0) {
        this.usersService.resetPassword(this.token, this.password, this.confirmPassword).subscribe((result)=>{
          alert(result.message);        
        });
      }
      else {
        this.usersService.changePassword(this.password, this.confirmPassword).subscribe((result)=>{
          this.router.navigate(['/dashboard']);        
        });
      }
    }
  }

}
