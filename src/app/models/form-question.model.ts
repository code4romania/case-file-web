import { BaseAnswer } from './base-answer.model';
import { Note } from './note.model';

export class FormQuestion {
    id: number;
    formCode: string;
    code: string;
    idSection: number;
    questionType: number;
    text: string;
    hint: string;
    optionsToQuestions: BaseAnswer[];
    questionId: number;
    showNoteSection: boolean;
    notes: Note[];
    charsNo: number;
    isMandatory: boolean;
}
