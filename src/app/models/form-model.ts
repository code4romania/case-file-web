import { FormSection } from './form-section.model';
export class Form {
    id: number;
    formSections: FormSection[];
    description: string;
    date: Date;
    type: number;
}
