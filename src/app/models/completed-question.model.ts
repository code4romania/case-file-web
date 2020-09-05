import { CompletedAnswer } from './completed-answer.model';
import { BaseQuestion } from './base-question.model';
import { Note } from './note.model';
export class CompletedQuestion extends BaseQuestion {
    answers: CompletedAnswer[];
    notes: Note[];
}
