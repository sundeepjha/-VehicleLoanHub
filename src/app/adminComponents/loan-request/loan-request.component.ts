import { AfterViewInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LoanApplicationService } from 'src/app/services/loan-application.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'loanType', 'model', 'submissionDate', 'purchasePrice', 'income', 'status', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  totalApplications = 0;
  pageSize = 10;
  pageIndex = 0;
  searchValue = '';
  statusControl = new FormControl(''); // Default value set to 'All'
  status = { 1: 'Pending', 2: 'Approved', 3: 'Rejected' }; // We get the loanStatus as 1, 2, 3 from the API
  selectedComment;
  selectedFile: SafeResourceUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('loanDetailsDialog') loanDetailsDialog: TemplateRef<any>;

  constructor(private loanApplicationService: LoanApplicationService, public dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadLoanApplications();
  }

  loadLoanApplications(): void {
    const sortDirection = this.sort?.direction || 'asc';
    const sortActive = this.sort?.active || 'submissionDate';

    const reqObj = {
      searchValue: this.searchValue,
      statusFilter: this.statusControl.value,
      page: this.pageIndex + 1,
      sortValue: sortDirection === 'asc' ? 1 : -1,
      pageSize: this.pageSize,
      sortBy: sortActive
    };

    this.loanApplicationService.getAllLoanApplications(reqObj).subscribe(response => {
      this.dataSource.data = response.loanApplications.map(application => ({
        ...application,
        approved: application.loanStatus === 2
      }));
      this.totalApplications = response.totalApplications;
    }, error => {
      console.error('Error fetching loan applications', error);
    });
  }

  onPaginateChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadLoanApplications();
  }

  onSortChange(): void {
    this.loadLoanApplications();
  }

  applyFilter(filterValue: string): void {
    this.searchValue = filterValue.trim().toLowerCase();
    this.loadLoanApplications();
  }

  applyStatusFilter(status: string): void {
    // Logic to filter the table data based on the selected status
    this.dataSource.filterPredicate = (data, filter) => {
      return status ? data.loanStatus === +status : true;
    };
    this.dataSource.filter = status;
  }

  toggleButtons(element: any, action: string): void {
    if (action === 'approve') {
      element.approved = true;
      element.rejected = false;
      this.updateLoanStatus(element, 2);
    } else if (action === 'reject') {
      element.approved = false;
      element.rejected = true;
      this.updateLoanStatus(element, 3);
    }
  }

  updateLoanStatus(element: any, status: number): void {
    const requestObject = { loanStatus: status };
    this.loanApplicationService.updateLoanApplication(element._id, requestObject).subscribe(response => {
      element.loanStatus = status;
      console.log(response);
      this.loadLoanApplications();
    }, error => {
      console.error('Error updating loan application', error);
    });
  }

  // Opens a dialog with loan details, setting the width to 600px and initializing the uploadedFileUrl.

  openDialog(element: any): void {
    this.dialog.open(this.loanDetailsDialog, {
      width: '100%'
    });
    // let url: string;
    // fetch("https://8080-dcecdfbffdaeefcecbbdecaadcacfbcbacceeeafb.premiumproject.examly.io/loanApplication/file/" + element.proofFile.filename)
    //   .then(res => res.blob())
    //   .then(blob => {
    //     url = URL.createObjectURL(blob);
    //     this.selectedFile = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    //   }).catch(err => console.log(err))
    this.selectedComment = element.comment; 
    const url = "https://8080-dcecdfbffdaeefcecbbdecaadcacfbcbacceeeafb.premiumproject.examly.io/loanApplication/file/" + element.proofFile.filename;
    this.selectedFile = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
