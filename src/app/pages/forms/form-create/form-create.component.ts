import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/services/forms.service';
import { Form } from 'src/app/models/form-model';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {
  title: string;
  form: Form;

  constructor(private formsService: FormsService, private router: Router) { }

  ngOnInit() {    
    
    // if(this.formsService.form)
    // {
    //   this.title = "Editeaza formular";      

    // }
    // else {
      this.title = "Adauga formular nou";
      this.form = new Form();
      this.form.description = "";
      this.form.type = -1;
    // }
  }

  public async openSectionPage(): Promise<void> {
    this.form.type = +this.form.type;         
    this.formsService.form = this.form;
    console.log(this.formsService.form);
  }

}
