// loan-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
// import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  loanForm: FormGroup;
  loanId: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService  ) {
    this.loanForm = this.fb.group({
      loanType: ['', Validators.required],
      description: ['', Validators.required],
      interestRate: ['', [Validators.required, Validators.min(0)]],
      maximumAmount: ['', [Validators.required, Validators.min(0)]]
    });
    this.loanId = null;
  }

  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('id');
    if (this.loanId) {
      this.loanService.getLoanById(this.loanId).subscribe((loan) => {
        this.loanForm.patchValue({
          loanType: loan.loanType,
          description: loan.description,
          interestRate: loan.interestRate,
          maximumAmount: loan.maximumAmount
        });
      });
      this.loanForm.get('loanType').disable();
    }
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      if (this.loanId) {
        this.loanService.updateLoan(this.loanId, this.loanForm.value).subscribe(() => {
          this.router.navigate(['/view_loan']);
        });
      } else {
        this.loanService.addLoan(this.loanForm.value).subscribe(() => {
          this.router.navigate(['/view_loan']);
        });
      }
    }
  }
}
