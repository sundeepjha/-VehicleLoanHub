import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanRequestComponent } from './loan-request.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LoanRequestComponent', () => {
  let component: LoanRequestComponent;
  let fixture: ComponentFixture<LoanRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRequestComponent],
      imports: [FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_loan_request_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_heading_exists_in_loan_request_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Loan Requests for Approval');
  });

  fit('Frontend_should_check_if_the_table_is_displayed_in_loan_request_component', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });

});
