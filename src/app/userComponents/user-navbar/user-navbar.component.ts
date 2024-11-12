import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  @ViewChild('logoutConfirmDialog') logoutConfirmDialog: TemplateRef<any>;

  constructor(private router: Router, private dialog: MatDialog) { }

  username = localStorage.getItem('username');

  ngOnInit(): void {
  }
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(this.logoutConfirmDialog, {
      width: '300px', 
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
