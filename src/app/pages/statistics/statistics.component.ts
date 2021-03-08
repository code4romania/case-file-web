import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportInfo } from 'src/app/models/report.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  reportsList: ReportInfo[];
  pageSize = 10;
  totalCount = 0;
  currentReport: ReportInfo;
  page = 1;
  activeCasesCurrentMonth: number;
  activeCasesPreviousMonth: number;
  activeCasesChildren: number;

  constructor(private usersService: UsersService, private statisticsService: StatisticsService, private router: Router) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.loadGeneralStatistics();

    this.loadReports(1, this.pageSize);
  }

  public async addReport(): Promise<void> {         
    this.statisticsService.report = null;
  }

  private loadReports(pageNo: number, pageSize: number) {
    this.statisticsService.searchStatistics("", pageNo, pageSize).subscribe((result)=>{
      this.reportsList = result.data;
      this.totalCount = result.totalItems;
    });
  }

  public search(value: string)
  {
    this.statisticsService.searchStatistics(value, this.page, this.pageSize).subscribe((result)=>{
      this.reportsList = result.data;
      this.totalCount = result.totalItems;
    });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadReports(this.page, this.pageSize);
  }
  
  public async viewReport(report: ReportInfo): Promise<void> {
    // console.log(form);
    // this.statisticsService.selectedReport = report;
  }

  private loadGeneralStatistics() {
    this.statisticsService.getGeneralStatistics().subscribe((result)=>{
      this.activeCasesCurrentMonth = result.activeCasesCurrentMonth;
      this.activeCasesPreviousMonth = result.activeCasesPreviousMonth;
      this.activeCasesChildren = result.activeCasesChildren;
      
      this.statisticsService.activeCasesCurrentMonth = result.activeCasesCurrentMonth;
      this.statisticsService.activeCasesPreviousMonth = result.activeCasesPreviousMonth;
      this.statisticsService.activeCasesChildren = result.activeCasesChildren;
    });
  }

}
