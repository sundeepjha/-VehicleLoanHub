import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  @ViewChild('logoutConfirmDialog') logoutConfirmDialog: TemplateRef<any>;

  constructor(private router: Router, public dialog: MatDialog) { }

  username = localStorage.getItem('username');
  
  ngOnInit(): void {
  }
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(this.logoutConfirmDialog);

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
