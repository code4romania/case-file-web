export class FormInfo {
    formVersions: FormDetails[];
}

export class FormDetails {
    id: number;
    formId: number;
    code: string;
    description: string;
    questionsAnsweredNo: number;
    totalQuestionsNo: number;
    selected: boolean;
    userName: string;
    date: string;
    canBeModified: boolean;
}