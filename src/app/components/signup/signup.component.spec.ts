import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ FormsModule, RouterTestingModule,ReactiveFormsModule, HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_signup_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Signup_word_exists_in_signup_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Signup');
  });

  fit('Frontend_should_check_if_the_Password_input_field_exists_signup_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Password"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Email_input_field_exists_signup_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

});
