import { Injectable } from '@angular/core';
import { ApiService } from '../core/apiService/api.service';
import { Beneficiary } from '../models/beneficiary.model';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs';
import { County } from '../models/county.model';
import { City } from '../models/city.model';
import { SearchResult } from '../models/search-result.model';
import { BeneficiaryInfo } from '../models/beneficiary-info.model';

@Injectable()
export class BeneficiariesService {
  private baseUrl: string;
  selectedBeneficiary: BeneficiaryInfo;
  beneficiary: Beneficiary;
  onlyAssignedForms: boolean;

  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public loadBeneficiaries(pageNo?: number, pageSize?: number) {
    var url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/beneficiary');

    if (pageNo > 0 && pageSize > 0) {
      url = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary?Page=${pageNo}&PageSize=${pageSize}`);
    }

    return this.http.get<SearchResult>(url).pipe();
  }

  public loadAssignedBeneficiaries(userId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary/?UserId=${userId}`);
    return this.http.get<SearchResult>(url).pipe();
  }

  public searchBeneficiaries(name: string, pageNo?: number, pageSize?: number) {
    var url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary?Name=${name}`);

    if (pageNo > 0 && pageSize > 0) {
      url = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary?Name=${name}&Page=${pageNo}&PageSize=${pageSize}`);
    }

    return this.http.get<SearchResult>(url).pipe();
  }

  public loadBeneficiariesCount() {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/beneficiary/count');
    return this.http.get<number>(url).pipe();
  }

  public addNewBeneficiary(beneficiary: Beneficiary) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary`);
    return this.http.post(url, beneficiary);
  }

  public saveChanges(beneficiary: Beneficiary, info: Beneficiary) {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/beneficiary');
    return this.http.put(url, { ...beneficiary, beneficiaryId: info.beneficiaryId });
  }

  public deleteBeneficiary(beneficiaryId: string) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary?beneficiaryId=${beneficiaryId}`);
    return this.http.delete(url);
  }

  public getBeneficiary(beneficiaryId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/beneficiary/${beneficiaryId}`);
    return this.http.get<Beneficiary>(url);
  }

  public loadCounties() {
    const url: string = Location.joinWithSlash(this.baseUrl, '/api/v1/county');
    return this.http.get<County[]>(url).pipe();
  }
 
  public loadCities(countyId: number) {    
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/county/${countyId}/cities`);
    return this.http.get<City[]>(url).pipe();
  }



}
