import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { Form } from 'src/app/models/form-model';
import { FormSection } from 'src/app/models/form-section.model';
import { FormQuestion } from 'src/app/models/form-question.model';
import { BaseAnswer } from 'src/app/models/base-answer.model';
import { SectionComponent } from '../section/section.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.scss']
})
export class SectionCreateComponent implements OnInit {  
  form: Form;
  showSection: boolean;
  showQuestion: boolean;
  currentSection: FormSection;
  currentQuestion: FormQuestion;
  showOptions: boolean;
  @ViewChild('section', {read: ViewContainerRef}) section: ViewContainerRef;

  constructor(private formsService: FormsService, private router: Router, private cfr: ComponentFactoryResolver, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }
    
    this.form = this.formsService.form;
    
  }

  addFormSection()
  {
    this.showOptions = false;
    this.showSection = true;
    if (!this.form.formSections)
      this.form.formSections = [];  
    this.form.formSections.push(new FormSection());
    this.currentSection = this.form.formSections[this.form.formSections.length - 1];
    this.loadSectionComponent(this.currentSection);
  }  

  saveForm()
  {
    if(this.form.formSections == undefined || this.form.formSections.length <= 0) {
      alert("Formularul trebuie să conțină cel puțin o secțiune.");
      return;
    }

    this.form.formSections.forEach(section  => {
      if (section.questions != undefined && section.questions.length > 0) {

        section.questions = section.questions.filter(q => q.text != undefined && q.text != null && q.text != '');

        section.questions.forEach(question => {
          question.questionType = +question.questionType;
          question.charsNo = +question.charsNo;
          if (question.questionType === 4 || question.questionType === 5 || question.questionType === 6) {
            question.optionsToQuestions = [];
            var option = new BaseAnswer();
            option.text = "";
            option.isFreeText = true;
            question.optionsToQuestions.push(option);          
          }          

        });
      }
    });
    //console.log("form to save: ");
    //console.log(this.form);

    var activeButton = document.activeElement.id;
    //console.log("activeButton");
    //console.log(activeButton);

    if (activeButton == "saveBtn") {
      this.formsService.saveForm(this.form).subscribe((result)=>{
        //console.log(result);
        this.router.navigate(['/forms']);
      });
    }
    if (activeButton == "publishBtn") {
      this.formsService.saveAndPublishForm(this.form).subscribe((result)=>{
        //console.log(result);
        this.router.navigate(['/forms']);
      });
    }    
  }

  async loadSectionComponent(section: FormSection) {
    const { SectionComponent } = await import('../section/section.component');

    let component : any = SectionComponent;

    var comp = this.section.createComponent(this.cfr.resolveComponentFactory<SectionComponent>(component));
    
    comp.instance.section = section;
    
    return comp;    
  }

}
