import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { Router } from '@angular/router';
import { NgoRequestDetails } from 'src/app/models/ngo-request.model';
import { NgosService } from 'src/app/services/ngos.service';

@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.scss']
})
export class NgoComponent implements OnInit {
  pendingNgoRequests: NgoRequestDetails[];
  ruledNgoRequests: NgoRequestDetails[];
  pageSize = 10;
  totalCount = 0;
  page = 1;
  ruledPageSize = 10;
  ruledTotalCount = 0;
  ruledPage = 1;
  
  constructor(private usersService: UsersService, private ngosService: NgosService, private router: Router) { }

  ngOnInit() {
    if (!this.usersService.verified2FA) {
      this.router.navigateByUrl('/login');
    }

    this.loadPendingNgoRequests(1, this.pageSize);
    this.loadRuledNgoRequests(1, this.ruledPageSize);
  }

  private loadPendingNgoRequests(pageNo: number, pageSize: number) {
    this.ngosService.loadNgoRequests(true, pageNo, pageSize).subscribe(result => 
      {       
        this.pendingNgoRequests = result.data;
        this.totalCount = result.totalItems;
        
      });
  }

  private loadRuledNgoRequests(pageNo: number, pageSize: number) {
    this.ngosService.loadNgoRequests(false, pageNo, pageSize).subscribe(result => 
      {       
        this.ruledNgoRequests = result.data;
        this.ruledTotalCount = result.totalItems;
        
      });
  }

  pageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.page = event.page;
      this.pageSize = event.pageSize;
    }
    this.loadPendingNgoRequests(this.page, this.pageSize);
  }

  ruledPageChanged(event) {
    if (event.page != undefined && event.pageSize != undefined) {
      this.ruledPage = event.page;
      this.ruledPageSize = event.pageSize;
    }
    this.loadRuledNgoRequests(this.ruledPage, this.ruledPageSize);
  }

  public async approveNgoRequest(request: NgoRequestDetails): Promise<void> {    
    //console.log(request);    
    this.ngosService.approveNgoRequest(request.ngoRequestId).subscribe((result)=>{
      //console.log(result);
      if (result) {
        alert ('Solicitarea a fost aprobata.');
      } else {
        alert ('A aparut o eroare, va rugam incercati din nou sau contactati-ne.')
      }

    });
  }

  public async rejectNgoRequest(request: NgoRequestDetails): Promise<void> {    
    //console.log(request);    
    this.ngosService.rejectNgoRequest(request.ngoRequestId).subscribe((result)=>{
      //console.log(result);
      if (result) {
        alert ('Solicitarea a fost respinsa.');
      } else {
        alert ('A aparut o eroare, va rugam incercati din nou sau contactati-ne.')
      }

    });
  }
  
}
