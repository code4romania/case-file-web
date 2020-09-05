export class AnswerWrapper {
    formId: number;
    completionDate: Date;
    answers: BulkAnswer[];
}

export class BulkAnswer {
    questionId: number;
    beneficiaryId: number;
    options: SelectedOption[];
}

export class SelectedOption {
    optionId: number;
    value: string;
}