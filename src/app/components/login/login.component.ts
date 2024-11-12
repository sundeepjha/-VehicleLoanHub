import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  isModalOpen = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('username', res.username);
          localStorage.setItem('role', res.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.Id);
          this.toastr.success("User logged in", 'Success');
          this.router.navigate(['/home']);

        },
        error: (err) => {
          this.handleError(err.status);
        }
      });
    }
  }

  handleError(status: number) {
    let message = '';
    switch (status) {
      case 402:
        message = 'Password is incorrect';
        break;
      case 404:
        message = 'Email not Found';
        break;
      case 500:
        message = 'Internal Server Error. Please try again later.';
        break;
    }
    this.toastr.error(message, 'Error');
  }




  // if(this.loginForm.valid){
  //     this.auth.login(this.loginForm.value).subscribe({
  //       next: (res)=>{
  //         sessionStorage.setItem('token', res.data.token);
  //         sessionStorage.setItem('user', res.data.user.role)
  //         // console.log(res.data.user.role === "User");
  //         if(res.data.user.role === "User"){
  //           this.router.navigate(["/home"]);
  //         } else {
  //           this.router.navigate(['/adminDash'])
  //         }
  //       },
  //       error: (err)=> {
  //         console.log(err);
  //         alert('Please register yourself')
  //       }
  //     })
  //   }



  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;

  }

  // showModal() {
  //     const modal = document.getElementById("errorModal");
  //     const span = document.querySelector(".close")[0];

  //     modal.style.display = "block";

  //     span.onclick = function() {
  //         modal.style.display = "none";
  //     }

  //     window.onclick = function(event) {
  //         if (event.target == modal) {
  //             modal.style.display = "none";
  //         }
  //     }
  // }

}




