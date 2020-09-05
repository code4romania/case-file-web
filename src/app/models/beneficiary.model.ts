import { FormDetails } from "./form-info.model";

export class Beneficiary
{
    beneficiaryId: number;
    userId: number;
    name: string;
    birthDate: Date;
    civilStatus: number;
    cityId: number;
    countyId: number;
    gender: number;
    forms: any[];
    familyMembers: FamilyMember[];
    formsIds: number[];
    newAllocatedFormsIds: number[];
    dealocatedFormsIds: number[];
    familyMembersIds: any[];

    city: string;
    county: string;
    assistantName: string;
    birthDateString: string;
}

export class FamilyMember
{
    beneficiaryId: number;
    name: string;
}