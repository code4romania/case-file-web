import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/users/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from '../../pages/users/users.component';
import { BeneficiarsComponent } from '../../pages/beneficiaries/beneficiars/beneficiars.component';
import { StatisticsComponent } from '../../pages/statistics/statistics.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { BeneficiaryInfoComponent } from '../../pages/beneficiaries/beneficiary-info/beneficiary-info.component';
import { FormsComponent } from '../../pages/forms/forms-templates/forms.component';
import { FormsSelectionComponent } from '../../pages/forms/forms-selection/forms-selection.component';
import { BeneficiaryComponent } from '../../pages/beneficiaries/beneficiary/beneficiary.component';
import { AssistantSelectionComponent } from '../../pages/beneficiaries/assistant-selection/assistant-selection.component';
import { UserComponent } from '../../pages/users/user/user.component';
import { FormComponent } from 'src/app/pages/forms/form/form.component';
import { FormAnswersComponent } from 'src/app/pages/forms/form-answers/form-answers.component';
import { FormCreateComponent } from 'src/app/pages/forms/form-create/form-create.component';
import { SectionCreateComponent } from 'src/app/pages/forms/section-create/section-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionComponent } from 'src/app/pages/forms/section/section.component';
import { QuestionComponent } from 'src/app/pages/forms/question/question.component';
import { OptionComponent } from 'src/app/pages/forms/option/option.component';
import { NgoComponent } from 'src/app/pages/ngo/ngo.component';
import { ReportComponent } from '../../pages/statistics/report/report.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    UsersComponent,
    BeneficiarsComponent,
    StatisticsComponent,
    SettingsComponent,
    BeneficiaryInfoComponent,
    FormsComponent,
    FormsSelectionComponent,
    BeneficiaryComponent,
    AssistantSelectionComponent,
    UserComponent,
    FormComponent,
    FormAnswersComponent,
    FormCreateComponent,
    SectionCreateComponent,
    SectionComponent,
    QuestionComponent,
    OptionComponent,
    NgoComponent,
    ReportComponent
  ]
})

export class AdminLayoutModule {}
