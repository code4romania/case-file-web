import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultLayoutRoutes } from './default-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from '../../pages/home/about/about.component';
import { PolicyComponent } from '../../pages/home/policy/policy.component';
import { TermsComponent } from '../../pages/home/terms/terms.component';
import { HomeComponent } from '../../pages/home/home/home.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DefaultLayoutRoutes),
    FormsModule
    // NgbModule
  ],
  declarations: [
    // AboutComponent,
    // PolicyComponent,
    // TermsComponent,
    HomeComponent
  ]
})
export class DefaultLayoutModule { }
