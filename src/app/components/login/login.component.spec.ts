import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_login_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Login_word_exists_in_login_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Login');
  });

  fit('Frontend_should_check_if_the_Email_input_field_exists_login_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

});
