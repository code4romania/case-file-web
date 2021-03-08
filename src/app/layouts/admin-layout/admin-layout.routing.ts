import { Routes } from '@angular/router';

// import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/users/user-profile/user-profile.component';
import { BeneficiarsComponent } from '../../pages/beneficiaries/beneficiars/beneficiars.component';
import { UsersComponent } from '../../pages/users/users.component';
import { FormsComponent } from '../../pages/forms/forms-templates/forms.component';
import { StatisticsComponent } from '../../pages/statistics/statistics.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { BeneficiaryInfoComponent } from '../../pages/beneficiaries/beneficiary-info/beneficiary-info.component';
import { FormsSelectionComponent } from '../../pages/forms/forms-selection/forms-selection.component';
import { AssistantSelectionComponent } from '../../pages/beneficiaries/assistant-selection/assistant-selection.component';
import { BeneficiaryComponent } from '../../pages/beneficiaries/beneficiary/beneficiary.component';
import { UserComponent } from '../../pages/users/user/user.component';
import { FormComponent } from 'src/app/pages/forms/form/form.component';
import { FormAnswersComponent } from 'src/app/pages/forms/form-answers/form-answers.component';
import { FormCreateComponent } from 'src/app/pages/forms/form-create/form-create.component';
import { SectionCreateComponent } from 'src/app/pages/forms/section-create/section-create.component';
import { NgoComponent } from 'src/app/pages/ngo/ngo.component';
import { ReportComponent } from 'src/app/pages/statistics/report/report.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: BeneficiarsComponent },
    { path: 'user-profile/:userId',   component: UserProfileComponent },
    { path: 'beneficiars',    component: BeneficiarsComponent },
    { path: 'users',   component: UsersComponent },
    { path: 'forms',   component: FormsComponent },
    { path: 'statistics',   component: StatisticsComponent },
    { path: 'settings',   component: SettingsComponent },
    { path: 'beneficiary-info',    component: BeneficiaryInfoComponent },
    { path: 'beneficiary-info/:beneficiaryId',    component: BeneficiaryInfoComponent },
    { path: 'forms-selection',   component: FormsSelectionComponent },
    { path: 'assistant-selection',   component: AssistantSelectionComponent },
    { path: 'beneficiary/:beneficiaryId',    component: BeneficiaryComponent },
    { path: 'user',    component: UserComponent },
    { path: 'user/:userId',    component: UserComponent },
    { path: 'form/:formId',    component: FormComponent },
    { path: 'form/:formId/:viewForm',    component: FormComponent },
    { path: 'form-answers/:formId',    component: FormAnswersComponent },
    { path: 'form-create',   component: FormCreateComponent },
    { path: 'section-create',   component: SectionCreateComponent },
    { path: 'ngo',   component: NgoComponent },
    { path: 'report',    component: ReportComponent },
    { path: 'report/:reportId',    component: ReportComponent }
];
