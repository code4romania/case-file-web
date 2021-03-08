import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from '../core/apiService/api.service';
import { GeneralStatistics, Report, ReportInfo } from "../models/report.model";
import { Location } from '@angular/common';
import { ApiListResponse } from "../models/api-list-response.model";

@Injectable()
export class StatisticsService {
    private baseUrl: string;    
    report: Report;
    activeCasesCurrentMonth: number;
    activeCasesPreviousMonth: number;
    activeCasesChildren: number;

    constructor(private http: ApiService) {
        this.baseUrl = environment.apiUrl;
    }

    public searchStatistics(name: string, pageNo?: number, pageSize?: number) {
        var url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/statistics?Title=${name}`);

        if (pageNo > 0 && pageSize > 0) {
            url = Location.joinWithSlash(this.baseUrl, `/api/v1/statistics?Title=${name}&Page=${pageNo}&PageSize=${pageSize}`);
        }

        return this.http.get<ApiListResponse<ReportInfo>>(url).pipe();
    }

    public addNewReport(report: Report) {
        const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/statistics`);
        return this.http.post(url, report);
    }

    public getReport(reportId: number) {
        const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/statistics/${reportId}`);
        return this.http.get<Report>(url);
    }

    public getGeneralStatistics() {
        const url: string = Location.joinWithSlash(this.baseUrl, `/api/v1/statistics/info`);
        return this.http.get<GeneralStatistics>(url);
    }
}