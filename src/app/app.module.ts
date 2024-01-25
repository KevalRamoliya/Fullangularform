import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { CrudComponent } from './crud/crud.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { AuthservicesService } from './services/authservices.service';
import { FirstpageComponent } from './firstpage/firstpage.component';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    CrudComponent,
    LoginComponent,
    FilterdataPipe,
    FirstpageComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    PaginatorModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
