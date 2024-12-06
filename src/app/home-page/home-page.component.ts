import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isLoggedIn = false;
  showLoginForm = false;
  showSignupForm = false;
  user:any = {
    "name":"Swatantra Kumar",
    "email":"rajswatantra9@gmail.com",
    "mobile":"9122160962",
    "enabled":true,
    "isMobileVerified": false
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Handle SignIn
  signin() {
    this.router.navigate(['signin'])
  }

  // Handle SignUp
  signup() {
    this.router.navigate(['signup'])
  }

  // Handle logout
  logout() {
    this.isLoggedIn = false;
  }

}
