import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/core/token/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './2fa.component.html',
  styleUrls: ['./2fa.component.scss']
})
export class TwoFAComponent implements OnInit {  
  token: string;

  constructor(private usersService: UsersService, private tokenService: TokenService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
  }

  verify() {
    if (this.token == null || this.token.length === 0) {     
      alert("Va rugam introduceti un cod valid.");
    }
    else {      
      this.usersService.verifyToken2FA(this.token).subscribe((result)=>{
        console.log("verifyToken2FA result: ")
        console.log(result);
        if (result.succeeded) {
          this.usersService.verified2FA = true;
          this.router.navigate(['/dashboard']);  
        } 
        else {
          this.tokenService.token = undefined;
          // alert("Cod de verificare incorect.");
          this.router.navigateByUrl('/login');
        }         
      });      
    }
  }

  resend() {
    this.usersService.resendToken2FA().subscribe((result)=>{
      console.log("resendToken2FA result: ")
      console.log(result);
      alert(result.message);
    });
  }

}
