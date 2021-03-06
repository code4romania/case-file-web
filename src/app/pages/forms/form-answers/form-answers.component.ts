import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { CompletedQuestion } from 'src/app/models/completed-question.model';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { UsersService } from 'src/app/services/users.service';
import { Note } from 'src/app/models/note.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit { 
  description: string;
  questions: CompletedQuestion[]
  beneficiaryId: number;
  notes: Note[];
  formId: number;
  imageSource: any;
  isImageLoading: boolean;

  constructor(private formsService: FormsService, private beneficiariesService: BeneficiariesService, private router: Router, private usersService: UsersService, private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.description = this.formsService.selectedForm.description;
    this.loadAnswers();
  }

  private loadAnswers()
  {    
    this.beneficiaryId = this.beneficiariesService.selectedBeneficiary.beneficiaryId;
    var userId = this.beneficiariesService.selectedBeneficiary.userId;
    this.formId = this.formsService.selectedForm.formId;
    this.formsService.loadAnswers(this.beneficiaryId, userId, this.formId).subscribe((result)=>{
      //console.log(result);
      this.questions = result;
      this.loadNotes(this.beneficiaryId, userId, this.formId);
    });
  }

  private loadNotes(beneficiaryId: number, userId: number, formId: number)
  {
    this.formsService.loadNotes(beneficiaryId, userId, formId).subscribe((result)=>{
      //console.log(result);
      this.notes = result;

      this.questions.forEach(question => {
        var qnotes = this.notes.filter(n => n.questionId == question.questionId);
        if (qnotes)
        {
          question.notes = qnotes;
        }        
      });
    });
    
  }

  loadPhoto(note: Note)
  {
    if (this.isImageLoading) {
      this.isImageLoading = false;
    }
    else {
      this.isImageLoading = true;
      this.formsService.loadNotePhoto(note.attachmentPath).subscribe((result)=>{

        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.imageSource = reader.result;
        }, false);
    
        if (result) {
          reader.readAsDataURL(result);
        }

      });
    }
  }
  
}
