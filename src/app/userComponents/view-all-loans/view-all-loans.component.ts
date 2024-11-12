import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
 
export interface Loan {
  loanType: string;
  maxAmount: number;
  interestRate: string;
  description: string;
  _id?:string;
}
 
@Component({
  selector: 'app-view-all-loans',
  templateUrl: './view-all-loans.component.html',
  styleUrls: ['./view-all-loans.component.css']
})
export class ViewAllLoansComponent implements AfterViewInit {
 
  displayedColumns: string[] = ['srNo', 'loanType', 'maxAmount', 'interestRate', 'description', 'action'];
  dataSource = new MatTableDataSource<Loan>();
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private loanService: LoanService, private router: Router) { }
 
  ngAfterViewInit(): void {
    this.getAllLoans();
  }
 
  getAllLoans() {
    this.loanService.getAllLoans().subscribe((res: Loan[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Loan, filter: string) => {
        const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
          return currentTerm + (data as { [key: string]: any })[key] + ' ';
        }, '').toLowerCase();
        return dataStr.indexOf(filter.trim().toLowerCase()) != -1;
      };
    });
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  select(element: Loan) {
    this.router.navigate([`/loan_application_form/${element._id}`]);
  }
}