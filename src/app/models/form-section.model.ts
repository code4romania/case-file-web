import { FormQuestion } from './form-question.model';

export class FormSection {
    sectionId: number;
    title: string;
    description: string;
    questions: FormQuestion[];
}
