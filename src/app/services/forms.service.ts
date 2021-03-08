import { ApiService, HttpOptions } from "../core/apiService/api.service";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { FormInfo, FormDetails } from "../models/form-info.model";
import { Location } from '@angular/common';
import { ApiListResponse } from "../models/api-list-response.model";
import { Form } from "../models/form-model";
import { FormSection } from "../models/form-section.model";
import { CompletedQuestion } from "../models/completed-question.model";
import { Note, NoteDto } from "../models/note.model";
import { AnswerWrapper } from "../models/answer-wrapper.model";


@Injectable()
export class FormsService {
  private baseUrl: string;
  selectedForm: FormDetails;
  form: Form;
  continueEditing: boolean;
  
  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public loadForms() {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/form');
    return this.http.get<FormInfo>(url).pipe();
  }

  public searchForms(name: string, pageNo?: number, pageSize?: number) {
    var url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}`);

    if (pageNo > 0 && pageSize > 0) {
      url = Location.joinWithSlash(this.baseUrl, `/api/v1/form/search?Description=${name}&Page=${pageNo}&PageSize=${pageSize}`);
    }

    return this.http.get<ApiListResponse<FormDetails>>(url).pipe();
  }

  public getForm(formId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/${formId}`);
    return this.http.get<FormSection[]>(url);
  }

  public loadAnswers(beneficiaryId: number, userId: number, formId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/answers/filledIn?beneficiaryId=${beneficiaryId}&userId=${userId}&formId=${formId}`);
    return this.http.get<CompletedQuestion[]>(url).pipe();
  }

  public loadNotes(beneficiaryId: number, userId: number, formId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v2/note?BeneficiaryId=${beneficiaryId}&UserId=${userId}&FormId=${formId}`);
    return this.http.get<Note[]>(url).pipe();
  }

  public saveAnswers(answers: AnswerWrapper) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/answers`);
    return this.http.post(url, answers);
  }

  public saveNote(note: NoteDto) {
    const formData = new FormData();
    formData.append('BeneficiaryId', note.beneficiaryId.toString());
    formData.append('QuestionId', note.questionId.toString());
    formData.append('Text', note.text);
    formData.append('File', note.file);

    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v2/note/upload`);    
    return this.http.post<any>(url, formData);
  }

  public loadNotePhoto(url: string) {
    return this.http.get<Blob>(url, {responseType: 'blob' as 'json'}).pipe();
  }

  public saveForm(form: Form) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form`);
    return this.http.post(url, form);
  }

  public saveAndPublishForm(form: Form) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form/publish`);
    return this.http.post(url, form);
  }

  public deleteForm(formId: string) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/form?formId=${formId}`);
    return this.http.delete(url);
  }
}