import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoanApplicationService } from 'src/app/services/loan-application.service';

@Component({
  selector: 'app-applied-loans',
  templateUrl: './applied-loans.component.html',
  styleUrls: ['./applied-loans.component.css']
})
export class AppliedLoansComponent implements AfterViewInit {

  displayedColumns: string[] = ['srNo', 'LoanName', 'submissionDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  card = false;
  selectedElement: any = {};
  userId = window.localStorage.getItem('userId'); // temporary userId
  status = { 1: 'Pending', 2: 'Approved', 3: 'Rejected' }; // we get the loanStatus as 1,2,3 from the api

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private loanService: LoanApplicationService) { }

  ngAfterViewInit(): void {
    this.loadLoanApplications();
  }

  loadLoanApplications(): void {
    this.loanService.getLoanApplicationsByUserId(this.userId).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  deleteButton(element): void {
    this.card = true;
    this.selectedElement = element;
  }

  delete(): void {
    this.loanService.deleteLoanApplication(this.selectedElement._id).subscribe(() => {
      this.loadLoanApplications();
      this.close();
    });
  }

  close(): void {
    this.card = false;
    this.selectedElement = {};
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSerialNumber(index: number): number {
    return index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }
}
