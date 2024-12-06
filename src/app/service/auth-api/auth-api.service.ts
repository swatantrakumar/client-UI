import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

constructor(
  private http:HttpClient,
  private storageService:StorageService
) { }

  async Signin(payload:any): Promise<{ success: boolean; message: string }>{
    let api = environment.apiUrl+'auth/signIn';
    let responce = {
      success : false,
      message: ""
    }
    try {
      const respData: any = await lastValueFrom(
        this.http.post(api, btoa(JSON.stringify(payload)))
      );
      if(respData && respData.success){
        const token = respData['token'];
        const user = respData['user'];
        this.storageService.SetToken(token);
        this.storageService.SetUser(user);
        responce.success = true;
        responce.message = 'Login Successful.';
      } else{
        responce.success = false;
        responce.message = respData['message'];
      }
    } catch (error: any) {
      responce.success = false;
      responce.message = error.error?.message;
    }
    return responce;

  }
  async Signup(payload: any): Promise<{ success: boolean; message: string }> {
    const api = `${environment.apiUrl}auth/signUp`;
    const response = {
      success: false,
      message: "",
    };

    try {
      const respData: any = await lastValueFrom(
        this.http.post(api, btoa(JSON.stringify(payload)))
      );

      if (respData && respData.message === 'User registered successfully') {
        response.success = true;
        response.message = respData.message;
      } else {
        response.success = false;
        response.message = respData.message;
      }
    } catch (error: any) {
      response.success = false;
      response.message = error.error?.message || 'An error occurred';
    }

    return response;
  }
  async sendOtp(payload:any){
    let api = environment.apiUrl+'mobile/send-otp';
    let responce:any = {
      success : false,
      message: ""
    }
    try {
      const respData = await lastValueFrom(
        this.http.post(api, payload)
      );
      responce = respData;
    } catch (error:any) {
      responce.success = false;
      responce.message = error.message ? error.message : "OTP not send successfully";
    }
    return responce;
  }
  async verifyOtp(payload:any){
    let api = environment.apiUrl+'mobile/verify-otp';
    let responce:any = {
      success : false,
      message: ""
    }
    try {
      const respData:any = await lastValueFrom(
        this.http.post(api, payload)
      );
      if(respData.user){
        this.storageService.SetUser(respData.user)
      }
      responce = respData;
    } catch (error:any) {
      responce.success = false;
      responce.message =error.message ? error.message :  "OTP not verified successfully";
    }
    return responce;
  }

}
