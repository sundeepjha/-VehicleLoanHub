
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-loan-application-form',
  templateUrl: './loan-application-form.component.html',
  styleUrls: ['./loan-application-form.component.css']
})
export class LoanApplicationFormComponent implements OnInit {

  userName = localStorage.getItem('username');
  userId = localStorage.getItem('userId')
  loanForm: FormGroup;
  loanId: string | null;
  loanDetail;
  todayDate = new Date();
  maximumAmount = 0;
  today = this.todayDate.toISOString().split('T')[0];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
    private loan: LoanService,
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService,
    private toster: ToastrService,
    private loanAppilcationService: LoanApplicationService
  ) {
    this.loanForm = this.fb.group({
      income: ['', Validators.required],
      model: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      address: ['', Validators.required],
      creditScore: ['', [Validators.required, Validators.max(900), Validators.min(300)]],
      loanTenure: ['', Validators.required],
      proofFile: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    let application = { userName: this.userName, userId: this.userId, ...this.loanForm.value, ...this.loanDetail };
    if (this.loanForm.valid) {
      const formData = new FormData();

      const income = this.loanForm.get('income')?.value;
      const model = this.loanForm.get('model')?.value;
      const purchasePrice = this.loanForm.get('purchasePrice')?.value;
      const address = this.loanForm.get('address')?.value;
      const creditScore = this.loanForm.get('creditScore')?.value;
      const proofFile = this.selectedFile;
      const userName = this.userName;
      const userId = this.userId;
      const loanType = this.loanDetail.loanType;
      const description = this.loanDetail.description;
      const interestRate = this.loanDetail.interestRate;
      const maximumAmount = this.loanDetail.maximumAmount;
      const _id = this.loanDetail._id;
      const loanTenure = this.loanForm.get('loanTenure')?.value;

      console.log({ income, model, purchasePrice, address, creditScore, proofFile, userName, userId, loanType, description, interestRate, maximumAmount, _id });

      formData.append('income', income);
      formData.append('model', model);
      formData.append('purchasePrice', purchasePrice);
      formData.append('address', address);
      formData.append('creditScore', creditScore);
      formData.append('proofFile', proofFile);
      formData.append('userName', userName);
      formData.append('userId', userId);
      formData.append('loanType', loanType);
      formData.append('description', description);
      formData.append('interestRate', interestRate);
      formData.append('maximumAmount', maximumAmount);
      formData.append('_id', _id);
      formData.append('loanTenure', loanTenure)

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }

      this.loanAppilcationService.addLoanApplication(formData).subscribe(
        (res) => {
          this.toster.success('Loan Applied Successfully');
          this.router.navigate(['view_all_loans']);
        },
        (err) => {
          const errorMessage = err.error.error;
          if (errorMessage.includes("duplicate key error collection")) {
            this.toster.warning('Duplicate loan application');
          } else {
            this.toster.error('Some Error Occured');
          }
        }
      )
    }
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   this.loanForm.patchValue({
  //     proofFile: file
  //   });
  // }


  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('id');
    if (this.loanId) {
      this.loanService.getLoanById(this.loanId).subscribe((loan) => {
        this.maximumAmount = loan.maximumAmount;
        console.log(this.maximumAmount);
        this.loanDetail = loan;
        this.loanForm.get('purchasePrice')?.setValidators([
          Validators.required,
          Validators.max(this.maximumAmount)
        ]);
      });
    }
  }

}


