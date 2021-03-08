import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { FormQuestion } from "src/app/models/form-question.model";
import { BaseAnswer } from "src/app/models/base-answer.model";
import { OptionComponent } from '../option/option.component';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
  })

  export class QuestionComponent {
    @ViewChild('option', {read: ViewContainerRef}) option: ViewContainerRef;
    showOptions: boolean;

    @Input()
    currentQuestion: FormQuestion;

    currentOption: BaseAnswer;

    constructor(private cfr: ComponentFactoryResolver) { }

    questionTypeChange(event, currentQuestion: FormQuestion)
    {    
      //console.log(event.target.value);
      let questionType = +event.target.value; 
        
      //console.log("currentQuestion: ");
      //console.log(currentQuestion);

      //console.log("selected questionType: ");
      //console.log(questionType);

      if (questionType === 0 || questionType === 1) {
        if(!currentQuestion.optionsToQuestions) {
          currentQuestion.optionsToQuestions = [];

          currentQuestion.optionsToQuestions.push(new BaseAnswer());
          currentQuestion.optionsToQuestions.push(new BaseAnswer());
        }

        this.showOptions = true;
      }
      else {
        this.showOptions = false;
      }
    }

    addOption() {
      //console.log(this.currentQuestion);

      if(!this.currentQuestion.optionsToQuestions)
        this.currentQuestion.optionsToQuestions = [];
      
      this.currentOption = new BaseAnswer();
      this.currentOption.isFreeText = false;
      this.currentQuestion.optionsToQuestions.push(this.currentOption);
      this.loadOptionComponent(this.currentOption);
    }

    async loadOptionComponent(option: BaseAnswer) {
      const { OptionComponent } = await import('../option/option.component');

      let component : any = OptionComponent;

      var comp = this.option.createComponent(this.cfr.resolveComponentFactory<OptionComponent>(component));
      
      comp.instance.currentOption = option;
      
      return comp;    
  }

  }