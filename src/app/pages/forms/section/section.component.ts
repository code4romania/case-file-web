import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { FormSection } from "src/app/models/form-section.model";
import { FormQuestion } from "src/app/models/form-question.model";
import { QuestionComponent } from '../question/question.component';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
  })

  export class SectionComponent {
    @ViewChild('question', {read: ViewContainerRef}) question: ViewContainerRef;
   
    @Input()
    section: FormSection;
    
    currentQuestion: FormQuestion;

    constructor(private cfr: ComponentFactoryResolver) { }

    addQuestion()
    {
        console.log(this.section);
        
        if(!this.section.questions)
            this.section.questions = [];
        this.section.questions.push(new FormQuestion());
        this.currentQuestion = this.section.questions[this.section.questions.length - 1];
        this.currentQuestion.questionType = 4;
        this.loadQuestionComponent(this.currentQuestion);
    }

    async loadQuestionComponent(question: FormQuestion) {
        const { QuestionComponent } = await import('../question/question.component');

        let component : any = QuestionComponent;

        var comp = this.question.createComponent(this.cfr.resolveComponentFactory<QuestionComponent>(component));
        
        comp.instance.currentQuestion = question;
        
        return comp;    
    }
    
  }