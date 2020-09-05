import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { County } from 'src/app/models/county.model';
import { City } from 'src/app/models/city.model';
import { BeneficiaryInfo } from 'src/app/models/beneficiary-info.model';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tables',
  templateUrl: './beneficiary-info.component.html',
  styleUrls: ['./beneficiary-info.component.scss']
})
export class BeneficiaryInfoComponent implements OnInit {
  countiesList: County[];
  citiesList: City[];
  beneficiariesList: BeneficiaryInfo[];
  beneficiary: Beneficiary;
  birthDate: Date;
  title: string;
  usersList: UserInfo[];
  // county: County;
  dateModel: NgbDateStruct;

  constructor(private beneficiariesService: BeneficiariesService, private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCounties();
    this.loadBeneficiaries();
    this.loadUsers();

    if(this.beneficiariesService.beneficiary)
    {
      this.title = "Editeaza beneficiar";
      this.beneficiary = this.beneficiariesService.beneficiary;      
      this.beneficiary.familyMembersIds = this.beneficiary.familyMembers != null 
                      ? this.beneficiary.familyMembers.map(function(el) { return el.beneficiaryId.toString() }) 
                      : null;
      console.log(this.beneficiariesService.beneficiary);            
      this.loadCities(this.beneficiary.countyId);
      var date = new Date(this.beneficiary.birthDate);      
      this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    else {
      this.title = "Adauga beneficiar nou";
      this.beneficiary = <Beneficiary>{};
      this.beneficiary.civilStatus = -1;
      this.beneficiary.gender = -1;
    }
    
  }

  private loadCounties()
  {
    this.beneficiariesService.loadCounties().subscribe((result)=>{
      this.countiesList = result;      
    });
  }

  private loadCities(countyId: number)
  {
    this.beneficiariesService.loadCities(countyId).subscribe((result)=>{
      this.citiesList = result;
    });
  }

  changeCounty(event)
  {
    console.log(event.target.value);
    let countyId = event.target.value; 
    this.loadCities(countyId);
  }

  private loadBeneficiaries() {
    this.beneficiariesService.loadBeneficiaries(undefined, undefined).subscribe((result)=>{
      this.beneficiariesList = result.data;
      if (this.beneficiary.beneficiaryId > 0)
      {
        this.beneficiariesList = this.beneficiariesList.filter(b => b.beneficiaryId != this.beneficiary.beneficiaryId);
      }
    });
  }

  // onDateSelect(evt:any) {
  //   this.birthDate = new Date(evt.year,evt.month,evt.day);
  //   console.log(this.birthDate);
  // }

  onDateSelect(evt:any) {
    // todo!!! improve this
    var day = evt.day + 1;
    this.birthDate = new Date(evt.year + '/' + evt.month + '/' + day);    
  }

  private loadUsers() {
    this.usersService.loadUsers().subscribe((result)=>{
      this.usersList = result.data;
    });
  }

  beneficiaryInfoAdded()
  {
    this.beneficiary.countyId = +this.beneficiary.countyId;
    this.beneficiary.cityId = +this.beneficiary.cityId;
    this.beneficiary.civilStatus = +this.beneficiary.civilStatus;
    this.beneficiary.gender = +this.beneficiary.gender;    
    this.beneficiary.birthDate = this.birthDate;    
    this.beneficiary.userId = +this.beneficiary.userId;
    this.beneficiary.familyMembersIds = this.beneficiary.familyMembersIds.map(Number);
    this.beneficiariesService.beneficiary = this.beneficiary;
    
    console.log("info to save: ");
    console.log(this.beneficiary);

    if(this.beneficiary.beneficiaryId > 0)
    {
      var benToSave = new Beneficiary();
      benToSave.userId = this.beneficiary.userId;
      benToSave.beneficiaryId = this.beneficiary.beneficiaryId;
      benToSave.name = this.beneficiary.name;
      benToSave.birthDate = this.beneficiary.birthDate;
      benToSave.civilStatus = this.beneficiary.civilStatus;
      benToSave.gender = this.beneficiary.gender;
      benToSave.cityId = this.beneficiary.cityId;
      benToSave.countyId = this.beneficiary.countyId;
      benToSave.familyMembersIds = this.beneficiary.familyMembersIds;

      this.beneficiariesService.saveChanges(benToSave, benToSave).subscribe((result)=>{
        console.log(result);        
        console.log(this.beneficiariesService.beneficiary);

        this.beneficiariesService.selectedBeneficiary.city = this.citiesList.filter(c => c.cityId == this.beneficiary.cityId)[0].name;
        this.beneficiariesService.selectedBeneficiary.county = this.countiesList.filter(c => c.countyId == this.beneficiary.countyId)[0].name;
        this.beneficiariesService.selectedBeneficiary.assistantName = this.usersList.filter(u => u.userId == this.beneficiary.userId)[0].name;
        this.router.navigate(['/beneficiary', this.beneficiary.beneficiaryId]);
      });
    }
    else
    {      
      this.router.navigate(['/forms-selection']);
    }
  }

}
