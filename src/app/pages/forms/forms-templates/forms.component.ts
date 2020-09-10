import { Component, OnInit } from '@angular/core';
import { FormDetails } from 'src/app/models/form-info.model';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  formsList: FormDetails[];
  pageSize = 10;
  totalCount = 0;
  page = 1;

  constructor(private formsService: FormsService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.loadForms(1, this.pageSize);
  }

  private loadForms(pageNo: number, pageSize: number) {
    this.formsService.searchForms("", pageNo, pageSize).subscribe((result)=>{
      this.formsList = result.data;
      console.log(this.formsList);
      this.totalCount = result.totalItems;
    });
  }

  public search(value: string)
  {
    this.formsService.searchForms(value, this.page, this.pageSize).subscribe((result)=>{
      this.formsList = result.data;
      this.totalCount = result.totalItems;
    });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadForms(this.page, this.pageSize);
  }

  public async formSelected(form: FormDetails): Promise<void> {    
    console.log(form);    
    this.formsService.selectedForm = form;
  }

  public async addForm(): Promise<void> {         
    this.formsService.selectedForm = null;
  }

  public async deleteForm(form: FormDetails): Promise<void> {    
    if(confirm("Esti sigur ca vrei sa stergi acest formular?")) {
      this.formsService.deleteForm(form.id.toString()).subscribe((result)=>{
        if (result === true)
        {
          this.loadForms(this.page, this.pageSize);
        }
        
      });
    }
  }

}
