import { Injectable } from '@angular/core';
import { ApiService } from '../core/apiService/api.service';
import { Beneficiary } from '../models/beneficiary.model';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { NgoRequest, NgoRequestDetails } from '../models/ngo-request.model';
import { ApiListResponse } from '../models/api-list-response.model';


@Injectable()
export class NgosService {
  private baseUrl: string;
  
  constructor(private http: ApiService) {
    this.baseUrl = environment.apiUrl;
  }

  public sendNgoRequest(request: NgoRequest) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo`);
    return this.http.post(url, request);
  }

  public loadNgoRequests(pending: boolean, pageNo?: number, pageSize?: number)
  {
    var url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo?Pending=${pending}`);

    if (pageNo > 0 && pageSize > 0) {
      url = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo?Pending=${pending}&Page=${pageNo}&PageSize=${pageSize}`);
    }

    return this.http.get<ApiListResponse<NgoRequestDetails>>(url).pipe();
  }

  public approveNgoRequest(requestId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo/approve`);
    return this.http.post(url, requestId);
  }

  public rejectNgoRequest(requestId: number) {
    const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/ngo/reject`);
    return this.http.post(url, requestId);
  }

}
