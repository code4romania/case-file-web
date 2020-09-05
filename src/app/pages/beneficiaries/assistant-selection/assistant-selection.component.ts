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

  constructor(private usersService: UsersService, private beneficiariesService: BeneficiariesService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.usersService.loadUsers().subscribe((result)=>{
      this.usersList = result.data;
    });
  }

  assistantSelected() {
    this.beneficiariesService.beneficiary.userId = this.usersList.filter(opt => opt.selected).map(opt => opt.userId)[0];

    this.beneficiariesService.addNewBeneficiary(this.beneficiariesService.beneficiary).subscribe((result)=>{
      console.log(result);
      this.beneficiariesService.beneficiary.beneficiaryId = result as number;
      console.log(this.beneficiariesService.beneficiary);
      this.router.navigate(['/beneficiars']);
    });    
  }
}
