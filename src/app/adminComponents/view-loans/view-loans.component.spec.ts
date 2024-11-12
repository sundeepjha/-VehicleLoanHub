import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLoansComponent } from './view-loans.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ViewLoansComponent', () => {
  let component: ViewLoansComponent;
  let fixture: ComponentFixture<ViewLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLoansComponent],
      imports: [FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_view_loans_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_heading_exists_in_view_loans_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Vehicle Loans');
  });

  fit('Frontend_should_check_table_is_displayed_in_view_loans_component', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(table).toBeTruthy();
  });

});
