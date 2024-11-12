import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewAllLoansComponent } from './view-all-loans.component';

describe('ViewAllLoansComponent', () => {
  let component: ViewAllLoansComponent;
  let fixture: ComponentFixture<ViewAllLoansComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllLoansComponent],
      imports: [ FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_all_loans_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_display_heading_in_view_all_loans_component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Available Vehicle Loans');
  });

  fit('Frontend_should_check_if_table_headers_exist_in_view_all_loans_component', () => {
    const headers = ['SNo', 'Loan Type', 'Loan Description', 'Interest Rate', 'Maximum Amount', 'Action'];
    const compiled = fixture.nativeElement;
    headers.forEach(header => {
      expect(compiled.textContent).toContain(header);
    });
  });

});
