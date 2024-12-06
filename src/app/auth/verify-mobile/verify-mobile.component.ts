import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { timer } from 'rxjs';
import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.css']
})
export class VerifyMobileComponent implements OnInit {


  verifyOTP!:FormGroup;

  countdown: number = 120; // 2 minutes countdown
  countdownSubscription: any;
  isResendEnabled: boolean = false;

  constructor(
    private authApiService:AuthApiService,
    private formBuilder:FormBuilder,
    private storageService:StorageService,
    private notifierService:NotifierService,
    private router:Router
  ) { }

  ngOnInit() {
    this.initForm()
    this.startCountdown();
  }
  initForm(){
    this.verifyOTP = this.formBuilder.group({
      "code": ['',[Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern(/^[0-9]*$/)]]
    })
  }
  startCountdown(): void {
    this.countdownSubscription = timer(0, 1000).subscribe((seconds) => {
      this.countdown = 120 - seconds; // 120 seconds countdown
      if (this.countdown <= 0) {
        this.isResendEnabled = true;
        this.countdownSubscription.unsubscribe();
      }
    });
  }
  async verifyMobile() {
    let value = this.verifyOTP.getRawValue();
    let mobileNumber = this.storageService.GetUser()?.mobileNumber;
    let payload = {
      mobileNumber :mobileNumber,
      code:value.code
    }
    let verify  = await this.authApiService.verifyOtp(payload);
    if(verify && verify.success){
      this.notifierService.notify("success",verify.message);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }else{
      this.notifierService.notify("error",verify.message);
    }
  }
  async resendOTP(){
    this.isResendEnabled = false;
    this.countdown = 120;
    this.startCountdown();
    let mobile = this.storageService.GetUser()?.mobileNumber;
    let payload = {
      mobileNumber :mobile
    }
    const sendOtp = await this.authApiService.sendOtp(payload);
    if(sendOtp && sendOtp.success){
      this.notifierService.notify("success",`We've sent an OTP to your mobile number: ${mobile}`)
    }else{
      this.notifierService.notify("error",sendOtp.message);
    }
  }
  get verifyForm(){
    return this.verifyOTP.controls;
  }

}
