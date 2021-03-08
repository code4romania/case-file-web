import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant-selection',
  templateUrl: './assistant-selection.component.html',
  styleUrls: ['./assistant-selection.component.scss']
})
export class AssistantSelectionComponent implements OnInit {
  usersList: UserInfo[];
  pageSize = 10;
  totalCount = 0;
  page = 1;

  constructor(private usersService: UsersService, private beneficiariesService: BeneficiariesService, private router: Router) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.loadUsers(1, this.pageSize);
  }

  // private loadUsers() {
  //   this.usersService.loadUsers().subscribe((result)=>{
  //     this.usersList = result.data;
  //   });
  // }

  private loadUsers(pageNo: number, pageSize: number) {
      this.usersService.loadUsers(pageNo, pageSize).subscribe((result)=>{
      this.usersList = result.data;
      this.totalCount = result.totalItems;      
    });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadUsers(this.page, this.pageSize);
  }

  assistantSelected() {
    this.beneficiariesService.beneficiary.userId = this.usersList.filter(opt => opt.selected).map(opt => opt.userId)[0];

    this.beneficiariesService.addNewBeneficiary(this.beneficiariesService.beneficiary).subscribe((result)=>{
      //console.log(result);
      this.beneficiariesService.beneficiary.beneficiaryId = result as number;
      //console.log(this.beneficiariesService.beneficiary);
      this.router.navigate(['/beneficiars']);
    });    
  }
}
