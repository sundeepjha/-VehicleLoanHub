import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppliedLoansComponent } from './applied-loans.component';

describe('AppliedLoansComponent', () => {
  let component: AppliedLoansComponent;
  let fixture: ComponentFixture<AppliedLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedLoansComponent],
      imports: [ FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_applied_loans_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_heading_exists_in_applied_loans_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Applied Loans');
  });

  fit('Frontend_should_check_if_no_records_found_message_is_displayed_in_applied_loans_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No Records Found');
  });
});
