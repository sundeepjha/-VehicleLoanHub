import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './adminComponents/admin-navbar/admin-navbar.component';
import { LoanFormComponent } from './adminComponents/loan-form/loan-form.component';
import { LoanRequestComponent } from './adminComponents/loan-request/loan-request.component';
import { ViewLoansComponent } from './adminComponents/view-loans/view-loans.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppliedLoansComponent } from './userComponents/applied-loans/applied-loans.component';
import { LoanApplicationFormComponent } from './userComponents/loan-application-form/loan-application-form.component';
import { UserNavbarComponent } from './userComponents/user-navbar/user-navbar.component';
import { ViewAllLoansComponent } from './userComponents/view-all-loans/view-all-loans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrModule } from 'ngx-toastr';
import { ChatAiComponent } from './chat-ai/chat-ai.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    LoanFormComponent,
    LoanRequestComponent,
    ViewLoansComponent,
    ErrorPageComponent,
    HomePageComponent,
    LoginComponent,
    AppliedLoansComponent,
    LoanApplicationFormComponent,
    UserNavbarComponent,
    ViewAllLoansComponent,
    ChatAiComponent,
    SignupComponent,
    LoaderComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }) 
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
