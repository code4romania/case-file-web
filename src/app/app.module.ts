import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';

import { BeneficiariesService } from './services/beneficiaries.service';
import { UsersService } from './services/users.service';
import { FormsService } from './services/forms.service';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NgosService } from './services/ngos.service';
import { StatisticsService } from './services/statistics.service';
import { DefaultLayoutBasicComponent } from './layouts/default-layout-basic/default-layout-basic.component';

import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';

registerLocaleData(localeRo, 'ro');


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent,
    DefaultLayoutBasicComponent
  ],
  providers: [
    BeneficiariesService,
    UsersService,
    FormsService,
    NgosService,
    StatisticsService,
    { provide: LOCALE_ID, useValue: 'ro' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
