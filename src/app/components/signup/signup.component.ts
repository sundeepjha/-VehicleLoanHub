import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isModalOpen = false;
  // isUserAlreadyExistsModalOpen = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // onsubmit will be trigger when the form is submitted this.signupForm.valid

  onSubmit() {
    if (this.signupForm.valid) {
      // Create a new object without the confirm password
      const { confirmPassword, ...signupData } = this.signupForm.value;
      // Pass the new object to the register function
      this.auth.register(signupData).subscribe({
        next: (res) => {
          this.openModal();
          this.toastr.success('Signup successful!', 'Success');
        },
        error: (err) => {
          switch (err.status) {
            case 409:
              this.toastr.error('User already registered', 'Error');
              break;
            case 400:
              this.toastr.error('Invalid data provided', 'Error');
              break;
            case 500:
              this.toastr.error('Server error, please try again later', 'Error');
              break;
            default:
              this.toastr.error('An unexpected error occurred', 'Error');
          }
        }
      });
    }
  }
  

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     // Create a new object without the confirm password
  //     const { confirmPassword, ...signupData } = this.signupForm.value;
  //     // console.log(signupData);
  //     // Pass the new object to the register function
  //     this.auth.register(signupData).subscribe({
  //       next: (res) => {
  //         this.openModal();
  //       },
  //       error: (err) => {
  //         switch (err.status) {
  //           case 409:
  //             alert("User already registered");
  //             break;
  //           case 400:
  //             alert("Invalid data provided");
  //             break;
  //           case 500:
  //             alert("Server error, please try again later");
  //             break;
  //           default:
  //             alert("An unexpected error occurred");
  //         }
  //       }
  //     });
  //   }
  // }
  

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/login']);

  }


}
