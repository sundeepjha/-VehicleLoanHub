import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoanFormComponent } from './loan-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LoanFormComponent', () => {
  let fixture: ComponentFixture<LoanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanFormComponent],
      imports: [FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFormComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_loan_form_component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_exists_in_loan_form_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Create New Loan');
  });

});
