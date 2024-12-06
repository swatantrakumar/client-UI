import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  constructor(
    private router: Router,
    private storageService:StorageService,
    private authApiService:AuthApiService,
    private notifierService:NotifierService
  ) {
    this.loadPage();
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    let token = this.storageService.GetToken();
    let user = this.storageService.GetUser();
    if(token){
      this.isLoggedIn = true;
    }
    if(user){
      this.user = user;
    }
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
    localStorage.clear();
    this.isLoggedIn = false;
  }

  //Send Opt Handling
  async sendOtp(){
    let payload = {
      mobileNumber:this.user.mobileNumber
    }
    const sendOtp = await this.authApiService.sendOtp(payload);
    if(sendOtp && sendOtp.success){
      this.notifierService.notify("success",`We've sent an OTP to your mobile number: ${this.user.mobileNumber}`)
      setTimeout(() => {
        this.router.navigate(['verify-mobile']);
      }, 2000);
    }else{
      this.notifierService.notify("error",sendOtp.message);
    }
  }

}
