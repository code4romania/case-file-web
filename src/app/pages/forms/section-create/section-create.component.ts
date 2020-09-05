import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { Form } from 'src/app/models/form-model';
import { FormSection } from 'src/app/models/form-section.model';
import { FormQuestion } from 'src/app/models/form-question.model';
import { BaseAnswer } from 'src/app/models/base-answer.model';
import { SectionComponent } from '../section/section.component';

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

  constructor(private formsService: FormsService, private router: Router, private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    
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

  // addQuestion(section: FormSection)
  // {
  //   this.showQuestion = true;
  //   if(!section.questions)
  //     section.questions = [];
  //   section.questions.push(new FormQuestion());
  //   this.currentQuestion = section.questions[section.questions.length - 1];
  //   this.currentQuestion.questionType = 4;
  // }

  // questionTypeChange(event, currentQuestion: FormQuestion)
  // {    
  //   console.log(event.target.value);
  //   let questionType = +event.target.value; 
      
  //   console.log("currentQuestion: ");
  //   console.log(currentQuestion);

  //   console.log("selected questionType: ");
  //   console.log(questionType);

  //   if (questionType === 0 || questionType === 1) {
  //     if(!currentQuestion.optionsToQuestions)
  //       currentQuestion.optionsToQuestions = [];

  //     currentQuestion.optionsToQuestions.push(new BaseAnswer());
  //     currentQuestion.optionsToQuestions.push(new BaseAnswer());

  //     this.showOptions = true;
  //   }
  //   else {
  //     this.showOptions = false;
  //   }
  // }

  saveForm()
  {
    this.form.formSections.forEach(section  => {

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
        else if (question.questionType === 1) { // single selection

        }
        else if (question.questionType === 0) { // multiple selection

        }

      });

    });
    console.log("form to save: ");
    console.log(this.form);

    this.formsService.saveForm(this.form).subscribe((result)=>{
      console.log(result);
      this.router.navigate(['/forms']);
    });
  }

  async loadSectionComponent(section: FormSection) {
    const { SectionComponent } = await import('../section/section.component');

    let component : any = SectionComponent;

    var comp = this.section.createComponent(this.cfr.resolveComponentFactory<SectionComponent>(component));
    
    comp.instance.section = section;
    
    return comp;    
  }

}
