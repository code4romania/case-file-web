import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Form } from 'src/app/models/form-model';
import { FormsService } from 'src/app/services/forms.service';
import { formatDate } from '@angular/common';
import { FormSection } from 'src/app/models/form-section.model';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { AnswerWrapper, BulkAnswer, SelectedOption } from 'src/app/models/answer-wrapper.model';
import { FormQuestion } from 'src/app/models/form-question.model';
import { Note, NoteDto } from 'src/app/models/note.model';
import { BaseAnswer } from 'src/app/models/base-answer.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit { 
  formId: number; 
  sections: FormSection[];
  description: string;
  dateModel: NgbDateStruct;
  showSection: boolean;  
  formDate: Date;
  notes: Note[];
  viewForm: boolean;

  constructor(private formsService: FormsService,private beneficiariesService: BeneficiariesService, private route: ActivatedRoute, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.route.params.subscribe(params => {
      this.formId = params['formId'];
      this.viewForm = params['viewForm'] != undefined ? params['viewForm'] : false;
      });
    //console.log(this.formId);
    console.log(this.viewForm);
    
    this.loadForm(this.formId);
  }

  onDateSelect(evt:any) {
    // todo!!! improve this
    var day = evt.day + 1;
    this.formDate = new Date(evt.year + '/' + evt.month + '/' + day);   
  }

  onQDateSelect(event: any, question: FormQuestion) {
    var day = event.day + 1;
    question.optionsToQuestions[0].value = (new Date(event.year + '/' + event.month + '/' + day)).toISOString().slice(0,10);
    // //console.log("onQDateSelect: ");
    // //console.log(question.optionsToQuestions[0].value);
  }

  private loadForm(formId: number) {
    this.formsService.getForm(formId).subscribe((result)=>{
      this.sections = result;
      // //console.log(result);
      this.description = this.formsService.selectedForm.description;
      var date = new Date(this.formsService.selectedForm.date);
      if (date.getFullYear() == 1) {
        date = new Date();
      } 
          
      this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
            
      // //console.log(this.sections);

      this.sections.forEach(section => {
        section.questions.forEach(question => { 
          question.notes = [];
          var note = new Note();
          note.questionId = question.questionId;
          question.notes.push(note);
          // //console.log("question.notes: ");
          // //console.log(question.notes);
          
          // question.optionsToQuestions.forEach(option => {
          //   option.isSelected = false;
          //   // //console.log(option);             
          // });

        })});
      //console.log(this.sections);    
    });
  }

  showNoteSection(question: FormQuestion)
  {
    question.showNoteSection = true;
  }

  hideNoteSection(question: FormQuestion)
  {
    question.showNoteSection = false;
  }

  selectOption(question: FormQuestion, option: BaseAnswer, event: any) {
    let checkbox = event.target;
    question.optionsToQuestions.forEach(o => {
      if (o.idOption == option.idOption) {
        o.isSelected = checkbox.checked;
      } else{
        o.isSelected = false;
      }
    });

    //console.log(option);    
  }

  onFileChange(event: any, question: FormQuestion) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      question.notes[0].file = file;
    }
  }
  
  saveForm()
  {
    var beneficiaryId = this.beneficiariesService.beneficiary.beneficiaryId;

    var answerWrapper = new AnswerWrapper();
    answerWrapper.formId = +this.formId;
    answerWrapper.completionDate = this.formDate;
    answerWrapper.answers = [];  
    
    var notesToSave = [];

    this.sections.forEach(section => {
      section.questions.forEach(question => {
        // answers
        var answer = new BulkAnswer();
        answer.beneficiaryId = beneficiaryId;
        answer.questionId = question.id > 0 ? question.id : question.questionId;

        if (question.questionType === 4 || question.questionType === 5 || question.questionType === 6)
        {
          if (question.questionType != 6) {
            question.optionsToQuestions[0].value = question.optionsToQuestions[0].text.trim();
          }
          if (question.optionsToQuestions[0].value != null && question.optionsToQuestions[0].value.length > 0) {
            answer.options = [];
            answer.options.push({optionId: question.optionsToQuestions[0].idOption, value: question.optionsToQuestions[0].value});
          }
        }
        else 
        {
          answer.options = question.optionsToQuestions
                  .filter(option => option.isSelected || (option.value != null && option.value.length > 0))
                  .map(option => ( { optionId: option.idOption, value: option.value } ) );
        }

        if (answer.options != null && answer.options.length > 0)
          answerWrapper.answers.push(answer);
          
        // notes        
        if (question.notes != null && question.notes.length > 0 && question.notes[0].text != undefined && (question.notes[0].text.length > 0 || question.notes[0].attachmentPath.length > 0 ))
        {
          question.notes.forEach(note => { 
            var noteDto = new NoteDto();
            noteDto.beneficiaryId = beneficiaryId;
            noteDto.questionId = note.questionId;
            noteDto.text = note.text;
            noteDto.file = note.file;
            notesToSave.push(noteDto);
          });

          //console.log("notesToSave: ");
          //console.log(notesToSave);
        }

      });
    });

    //console.log("answerWrapper: ");
    //console.log(answerWrapper);

    // var answersSaved = false; todo: improve this
    this.formsService.saveAnswers(answerWrapper).subscribe((result)=>{
      //console.log(result);

      notesToSave.forEach(note => {
        this.formsService.saveNote(note).subscribe((result)=>{
          //console.log(result);
        });
      });

      this.router.navigate(['/beneficiary', beneficiaryId]);
    });
    
  }
}
