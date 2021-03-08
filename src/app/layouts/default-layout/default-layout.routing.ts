import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home/home.component';
import { PolicyComponent } from 'src/app/pages/home/policy/policy.component';
import { TermsComponent } from 'src/app/pages/home/terms/terms.component';
import { AboutComponent } from '../../pages/home/about/about.component';


export const DefaultLayoutRoutes: Routes = [
    // { path: 'about', component: AboutComponent },
    // { path: 'policy', component: PolicyComponent },
    // { path: 'terms', component: TermsComponent },
    { path: 'home', component: HomeComponent }
];
