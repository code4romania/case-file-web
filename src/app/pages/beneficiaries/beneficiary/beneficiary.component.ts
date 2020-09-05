import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { formatDate } from '@angular/common';
import { FormDetails } from 'src/app/models/form-info.model';
import { FormsService } from 'src/app/services/forms.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { UsersService } from 'src/app/services/users.service';
import { NoteDto, Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit {
  beneficiaryId: number;
  sub: any;
  beneficiary: Beneficiary;
  completedForms: FormDetails[];
  currentUser: UserInfo;
  notes: Note[];
  pageSize = 5;
  totalCount = 0;
  page = 1;
  allocatedFormsPage = 1;
  allocatedFormsPageSize = 5;
  allocatedFormsTotalCount = 0;
  allocatedForms: FormDetails[];

  constructor(private route: ActivatedRoute, private beneficiariesService: BeneficiariesService, private formsService: FormsService, private usersService: UsersService) {
    
   }

  ngOnInit() {    
    this.sub = this.route.params.subscribe(params => {
      this.beneficiaryId = params['beneficiaryId'];
      });
    console.log(this.beneficiaryId);
    
    this.loadBeneficiary(this.beneficiaryId);

    this.loadNotes(this.beneficiaryId);    
  }

  private loadBeneficiary(beneficiaryId: number) {
    this.beneficiariesService.getBeneficiary(beneficiaryId).subscribe((result)=>{
      this.beneficiary = result;

      // console.log(this.usersService.currentUser);
      this.currentUser = this.usersService.currentUser;
      
      this.beneficiary.city = this.beneficiariesService.selectedBeneficiary.city;
      this.beneficiary.county = this.beneficiariesService.selectedBeneficiary.county;
      this.beneficiary.assistantName = this.beneficiariesService.selectedBeneficiary.assistantName;
      this.beneficiariesService.selectedBeneficiary.userId = this.beneficiary.userId;
      this.beneficiary.birthDateString = formatDate(this.beneficiary.birthDate, "dd.MM.yyyy", 'en-EN');
      this.completedForms = this.beneficiary.forms ? this.beneficiary.forms.filter(f => f.questionsAnsweredNo > 0).slice(0, this.pageSize) : this.completedForms;
      this.totalCount = this.beneficiary.forms ? this.beneficiary.forms.filter(f => f.questionsAnsweredNo > 0).length : 0;
      this.allocatedForms = this.beneficiary.forms ? this.beneficiary.forms.slice(0, this.allocatedFormsPageSize) : this.allocatedForms;
      this.allocatedFormsTotalCount = this.beneficiary.forms ? this.beneficiary.forms.length : 0;
    });
  }

  pageChanged(event) {    
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.completedForms = this.beneficiary.forms.filter(f => f.questionsAnsweredNo > 0).slice(this.pageSize * (this.page - 1), this.pageSize);
  }

  allocatedFormsPageChanged(event) {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.allocatedForms = this.beneficiary.forms.slice(this.allocatedFormsPageSize * (this.allocatedFormsPage - 1), this.pageSize);
  }
  
  private loadNotes(beneficiaryId: number) {
    this.formsService.loadNotes(beneficiaryId, 0, 0).subscribe((result)=>{
      this.notes = result;
    });
  }

  public async editBeneficiary(): Promise<void> {
    this.beneficiariesService.beneficiary = this.beneficiary;
  }

  public async editAssignedForms(): Promise<void> {
    this.beneficiariesService.beneficiary = this.beneficiary;
    this.beneficiariesService.onlyAssignedForms = true;
  }

  public async formSelected(form: FormDetails): Promise<void> { 
    this.beneficiariesService.beneficiary = this.beneficiary;   
    this.formsService.selectedForm = form;
    console.log(this.formsService.selectedForm);
  }

  public async editForm(form: FormDetails): Promise<void> { 
    this.beneficiariesService.beneficiary = this.beneficiary;   
    this.formsService.selectedForm = form;
    this.formsService.continueEditing = true;
    console.log(this.formsService.selectedForm);
  }

  public async deleteForm(form: FormDetails): Promise<void> {    
    if(confirm("Esti sigur ca vrei sa dealoci acest formular?")) {
      // this.formsService.(user.userId.toString()).subscribe((result)=>{
      //   if (result === true)
      //   {
      //     this.usersList = this.usersList.filter(u => u.userId !== user.userId);
      //     this.totalCount = this.usersList.length;
      //   }
        
      // });
    }
  }

  public async addNote(): Promise<void> {
  }

  public async noteSelected(note: Note): Promise<void> {
  }

  public async deleteNote(note: Note): Promise<void> {
  }

  

}
