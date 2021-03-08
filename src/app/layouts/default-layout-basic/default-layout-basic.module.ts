import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultLayoutBasicRoutes } from './default-layout-basic.routing';
import { AboutComponent } from '../../pages/home/about/about.component';
import { PolicyComponent } from '../../pages/home/policy/policy.component';
import { TermsComponent } from '../../pages/home/terms/terms.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DefaultLayoutBasicRoutes),
    FormsModule
  ],
  declarations: [
    AboutComponent,
    PolicyComponent,
    TermsComponent
  ]
})
export class DefaultLayoutBasicModule { }
