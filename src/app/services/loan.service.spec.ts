import { TestBed } from '@angular/core/testing';

import { LoanService } from './loan.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({  imports: [HttpClientTestingModule],});
    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_loan_service', () => {
    expect(service).toBeTruthy();
  });
});
