import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {  
  activeCasesCurrentMonth: number;
  activeCasesPreviousMonth: number;
  activeCasesChildren: number;
  report: Report;  
  creationDate: string;
  title: string;
  dateModel: NgbDateStruct;
  reportId: number;
  viewReport: boolean;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private statisticsService: StatisticsService) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }
    
    this.route.params.subscribe(params => {
      this.reportId = params['reportId'];
      this.viewReport = this.reportId != undefined ? true : false;
    });
    // console.log(this.reportId);

    if (this.reportId == undefined) {
      this.statisticsService.report = undefined;
    }

    this.activeCasesCurrentMonth = this.statisticsService.activeCasesCurrentMonth;
    this.activeCasesPreviousMonth = this.statisticsService.activeCasesPreviousMonth;
    this.activeCasesChildren = this.statisticsService.activeCasesChildren;
    
    if(this.viewReport)
    {
      this.title = "Vizualizează raport";

      this.statisticsService.getReport(this.reportId).subscribe((result)=>{
        this.statisticsService.report = result;
        this.report = this.statisticsService.report;
        // console.log(this.report);

        var date = new Date(this.report.creationDate);      
        this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
      });
    }
    else {
      this.title = "Adaugă raport nou";
      this.report = <Report>{};
      this.report.reportType = -1;
    }
  }

  addReport()
  {
      this.report.reportType = +this.report.reportType;
      this.statisticsService.report = this.report;
      //console.log(this.report);
      
      this.statisticsService.addNewReport(this.report).subscribe((result)=>{
        //console.log(result);
        this.statisticsService.report.reportId = result as number;
        //console.log(this.statisticsService.report);
        this.router.navigate(['/statistics']);
      });
  }

  onDateSelect(evt:any) {
    // todo!!! improve this
    var day = evt.day + 1;
    this.report.creationDate = new Date(evt.year + '/' + evt.month + '/' + day);    
  }

}
