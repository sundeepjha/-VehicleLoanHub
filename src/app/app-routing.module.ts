import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoanFormComponent } from './adminComponents/loan-form/loan-form.component';
import { ViewAllLoansComponent } from './userComponents/view-all-loans/view-all-loans.component';
import { LoanApplicationFormComponent } from './userComponents/loan-application-form/loan-application-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewLoansComponent } from './adminComponents/view-loans/view-loans.component';
import { AppliedLoansComponent } from './userComponents/applied-loans/applied-loans.component';
import { LoanRequestComponent } from './adminComponents/loan-request/loan-request.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing_page',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
    
  },
  {
    path: 'loan',
    component: LoanFormComponent,
    canActivate: [AuthGuard],
    data: {role: "admin"}
  },
  {
    path: "edit-loan/:id",
    component: LoanFormComponent,
    canActivate: [AuthGuard],
    data: {role: "admin"}
  },
  {
    path: 'view_all_loans',
    component: ViewAllLoansComponent,
    canActivate: [AuthGuard],
    data: {role: "user"}
  },
  {
    path: 'loan_application_form/:id',
    component: LoanApplicationFormComponent,
    canActivate: [AuthGuard],
    data: {role: "user"}
  },
  {
    path: "view_loan",
    component: ViewLoansComponent,
    canActivate: [AuthGuard],
    data: {role: "admin"}
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  { 
    path: 'applied_loans',
    component: AppliedLoansComponent,
    canActivate: [AuthGuard],
    data: {role: "user"}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add_loan',
    component: LoanFormComponent,
    canActivate: [AuthGuard],
    data: {role: "admin"}
  },
  {
    path: 'view_loan',
    component: ViewLoansComponent,
    canActivate: [AuthGuard],
    data: {role: "user"}
  },
  {
    path: 'loans_requested',
    component: LoanRequestComponent,
    canActivate: [AuthGuard],
    data: {role: "admin"}
  },
  {
    path: 'landing_page',
    component: LandingPageComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
