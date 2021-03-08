import { Component, OnInit } from '@angular/core';
import { FormInfo, FormDetails } from 'src/app/models/form-info.model';
import { FormsService } from 'src/app/services/forms.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forms-selection',
  templateUrl: './forms-selection.component.html',
  styleUrls: ['./forms-selection.component.scss']
})
export class FormsSelectionComponent implements OnInit {
  formsList: FormDetails[];
  allocatedFormsIds: number[] = [];
  pageSize = 10;
  totalCount = 0;
  page = 1;
  
  constructor(private formsService: FormsService, private beneficiariesService: BeneficiariesService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.loadForms(1, this.pageSize);    
  }

  private loadForms(pageNo: number, pageSize: number) {
    this.formsService.searchForms("", pageNo, pageSize).subscribe((result)=>{
      this.formsList = result.data;
      this.totalCount = result.totalItems;
      this.formsList.forEach(form => {
        form.formId = form.id;
      });

      //console.log(result);
      if(this.beneficiariesService.beneficiary && this.beneficiariesService.beneficiary.forms)
      {        
        this.formsList.forEach(form => {
          if (this.beneficiariesService.beneficiary.forms.map(f => f.formId).includes(form.formId)) {
            form.selected = true;
            this.allocatedFormsIds.push(form.formId);
            //console.log(this.allocatedFormsIds);
          }
        });
      }

    });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadForms(this.page, this.pageSize);
  }

  formsSelected(){
    this.beneficiariesService.beneficiary.formsIds = this.formsList.filter(opt => opt.selected).map(opt => opt.formId);
    //console.log(this.beneficiariesService.beneficiary);
    
    if(this.beneficiariesService.beneficiary.beneficiaryId > 0)
    {
      this.beneficiariesService.beneficiary.newAllocatedFormsIds = [];
      this.beneficiariesService.beneficiary.formsIds.forEach(id => {
        if (!this.allocatedFormsIds.includes(id)) {
          this.beneficiariesService.beneficiary.newAllocatedFormsIds.push(id);
        }
      })

      this.beneficiariesService.beneficiary.dealocatedFormsIds = this.allocatedFormsIds.filter(f => !this.beneficiariesService.beneficiary.formsIds.includes(f));
      
      this.beneficiariesService.saveChanges(this.beneficiariesService.beneficiary, this.beneficiariesService.beneficiary).subscribe((result)=>{
        //console.log(result);        
        //console.log(this.beneficiariesService.beneficiary);
        this.router.navigate(['/beneficiary', this.beneficiariesService.beneficiary.beneficiaryId]);
      });
    }
    else
    {
      this.beneficiariesService.addNewBeneficiary(this.beneficiariesService.beneficiary).subscribe((result)=>{
        //console.log(result);
        this.beneficiariesService.beneficiary.beneficiaryId = result as number;
        //console.log(this.beneficiariesService.beneficiary);
        this.router.navigate(['/beneficiars']);
      });
    }
  }

  public async viewForm(form: FormDetails): Promise<void> {
    // console.log(form);
    this.formsService.selectedForm = form;
  }

}
