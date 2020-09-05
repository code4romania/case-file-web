import { BeneficiaryInfo } from "./beneficiary-info.model";

export class SearchResult {
    data: BeneficiaryInfo[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number; 
}