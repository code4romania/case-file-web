import { Component, OnInit, ViewChild } from '@angular/core';
import { BeneficiaryInfo } from '../../../models/beneficiary-info.model';
import { BeneficiariesService } from '../../../services/beneficiaries.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-beneficiars',
  templateUrl: './beneficiars.component.html',
  styleUrls: ['./beneficiars.component.scss']
})
export class BeneficiarsComponent implements OnInit {  
  beneficiariesList: BeneficiaryInfo[];
  pageSize = 10;
  totalCount = 0;
  currentUser: UserInfo;
  page = 1;
  
  constructor(private beneficiariesService: BeneficiariesService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }
    // this.currentUser = this.usersService.currentUser;
    this.loadBeneficiaries(1, this.pageSize);
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadBeneficiaries(this.page, this.pageSize);
  }

  private loadBeneficiaries(pageNo: number, pageSize: number) {
    this.usersService.loadCurrentUserInfo().subscribe(result => 
      { 
        this.currentUser = result;
        this.usersService.currentUser = result;

    // this.currentUser = this.usersService.currentUser;
    
    this.beneficiariesService.loadBeneficiaries(pageNo, pageSize).subscribe((result)=>{
      this.beneficiariesList = result.data;
      this.totalCount = result.totalItems;
    });
      });    
  }

  public async beneficiarySelected(beneficiary: BeneficiaryInfo): Promise<void> {    
    //console.log(beneficiary);    
    this.beneficiariesService.selectedBeneficiary = beneficiary;
  }

  public async addBeneficiary(): Promise<void> {         
    this.beneficiariesService.beneficiary = null;
  }

  public search(value: string)
  {
    this.beneficiariesService.searchBeneficiaries(value, this.page, this.pageSize).subscribe((result)=>{
      this.beneficiariesList = result.data;
      this.totalCount = result.totalItems;
    });
  }

  public async deleteBeneficiary(beneficiary: BeneficiaryInfo): Promise<void> {
    if(confirm("Esti sigur ca vrei sa stergi beneficiarul " + beneficiary.name + "?")) {
      this.beneficiariesService.deleteBeneficiary(beneficiary.beneficiaryId.toString()).subscribe((result)=>{
        if (result === true)
        {
          this.loadBeneficiaries(this.page, this.pageSize);
        }
        
      });
    }
  }
}
