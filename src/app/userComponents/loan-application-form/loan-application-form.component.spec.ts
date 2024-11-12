import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoanApplicationFormComponent } from './loan-application-form.component';

describe('LoanApplicationFormComponent', () => {
  let fixture: ComponentFixture<LoanApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanApplicationFormComponent],
      imports: [ FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplicationFormComponent);
    fixture.detectChanges();
  });

  fit('Frontend_should_create_loan_application_form_component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_heading_exists_in_loan_application_form_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Loan Application Form');
  });

  fit('Frontend_should_check_if_labels_exist_in_loan_application_form_component', () => {
    const headers = ['Income', 'Model', 'Purchase Price', 'Address', 'Proof'];
    const compiled = fixture.nativeElement;
    headers.forEach(header => {
      expect(compiled.textContent).toContain(header);
    });
  });
  
});
