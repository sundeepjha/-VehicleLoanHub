import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vehicle loan Hub';
  storage = window.localStorage;
  isLoading = false;
  private loadingTimeout: any;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges(); 

      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }

      if (loading) {
        this.loadingTimeout = setTimeout(() => {
          if (this.isLoading) {
            this.isLoading = false; 
            this.cdr.detectChanges(); 
          }
        }, 5000); 
      }
    });
  }
}

