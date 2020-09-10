import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BeneficiaryInfo } from 'src/app/models/beneficiary-info.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  sub: any;
  user: User;
  beneficiaries: BeneficiaryInfo[];
  typesString: string;  
  typesNames: string[] = [];
  pageSize = 10;
  totalCount = 0;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private beneficiariesService: BeneficiariesService, private router: Router) {    
  }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }
    
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      });
    console.log(this.userId);
    
    this.loadUser(this.userId);
    this.loadBeneficiaries(1, this.userId);
    
  }

  private loadUser(userId: number) {
    this.usersService.getUser(userId).subscribe((result)=>{
      this.user = result;      
      // console.log(this.user.birthDate);
      this.user.birthDateString = formatDate(this.user.birthDate, "dd.MM.yyyy", 'en-EN');
      this.typesString = this.user.types && this.user.types.length > 0 ? this.user.types[0] + "" : "-";
      // console.log(this.user.types);
      if (this.user.types && this.user.types.length > 0 )
      {
        this.user.types.forEach(type => {          
          if (type === 0)
            this.typesNames.push("Asistent comunitar/a");
          if (type === 1)
            this.typesNames.push("Asistent social");  
          if (type === 2)
            this.typesNames.push("Mediator sanitar");
          if (type === 3)
            this.typesNames.push("Medic pediatru");
          if (type === 4)
            this.typesNames.push("Medic ginecolog");
          if (type === 5)
            this.typesNames.push("Psiholog");
          if (type === 6)
            this.typesNames.push("Logoped");
          if (type === 7)
            this.typesNames.push("Alta specializare");  
            
        });
        // console.log(this.typesNames);
      }
    });
  }

  private loadBeneficiaries(pageNo: number, userId: number) {
    this.beneficiariesService.loadAssignedBeneficiaries(userId).subscribe((result)=>{
      this.beneficiaries = result.data;
    });
  }

  public async editUser(): Promise<void> {
    this.usersService.user = this.user;
  }

  public async beneficiarySelected(beneficiary: BeneficiaryInfo): Promise<void> {    
    console.log(beneficiary);    
    this.beneficiariesService.selectedBeneficiary = beneficiary;
  }

  public search(value: string)
  {
    this.beneficiariesService.searchBeneficiaries(value, undefined, undefined).subscribe((result)=>{
      this.beneficiaries = result.data;
      this.totalCount = result.totalItems;
    });
  }

}
