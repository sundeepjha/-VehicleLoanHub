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
}

@Component({
  selector: 'app-view-loans',
  templateUrl: './view-loans.component.html',
  styleUrls: ['./view-loans.component.css'],
})
export class ViewLoansComponent implements AfterViewInit {

  card = false;
  selecetedElement: any = {};

  displayedColumns: string[] = ['loanType', 'maximumAmount', 'interestRate', 'description', 'action'];
  dataSource = new MatTableDataSource<Loan>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private loanService: LoanService, private router: Router) { }

  ngAfterViewInit(): void {
    this.getAllLoans();
    this.dataSource.filterPredicate = (data: Loan, filter: string) => {
      const dataStr = `${data.loanType} ${data.maxAmount} ${data.interestRate} ${data.description}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  getAllLoans() {
    this.loanService.getAllLoans().subscribe((res: Loan[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator; // Assign paginator after data is loaded
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteButton(element) {
    this.card = true;
    this.selecetedElement = element;
  }

  editButton(id: number) {
    this.router.navigate(['/edit-loan', id]);
  }

  delete() {
    this.loanService.deleteLoan(this.selecetedElement._id).subscribe((res) => {
      this.getAllLoans();
      this.close();
    });
  }

  close() {
    this.card = false;
    this.selecetedElement = {};
  }
}
