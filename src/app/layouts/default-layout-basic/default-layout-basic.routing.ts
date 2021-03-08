import { Routes } from '@angular/router';
import { PolicyComponent } from 'src/app/pages/home/policy/policy.component';
import { TermsComponent } from 'src/app/pages/home/terms/terms.component';
import { AboutComponent } from '../../pages/home/about/about.component';


export const DefaultLayoutBasicRoutes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'terms', component: TermsComponent }
];
