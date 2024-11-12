import { TestBed } from '@angular/core/testing';

import { LoanApplicationService } from './loan-application.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

describe('LoanApplicationService', () => {
  let service: LoanApplicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({  imports: [HttpClientTestingModule],});
    service = TestBed.inject(LoanApplicationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  fit('Frontend_should_create_loanapplication_service', () => {
    expect(service).toBeTruthy();
  });
});
