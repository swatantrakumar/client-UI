import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.css']
})
export class VerifyMobileComponent implements OnInit {

  otp: string = '';

  constructor(
    private authApiService:AuthApiService
  ) { }

  ngOnInit() {
  }
  async verifyMobile() {
    if (this.otp) {
      // Call the API to verify the OTP
      let verify  = await this.authApiService.verifyOtp(this.otp)
    }
  }

}
