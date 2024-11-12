import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  menuActive = false;

  features = [
    { title: 'Easy Application', description: 'Our platform offers a seamless application process.' },
    { title: 'Competitive Rates', description: 'Get the best rates available in the market.' },
    { title: 'Quick Approval', description: 'Fast and efficient loan approval process.' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  navigate() {
    this.router.navigateByUrl('/login')
  }
}
