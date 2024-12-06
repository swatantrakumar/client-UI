import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

constructor(
  private http:HttpClient,
  private storageService:StorageService
) { }

  async Signin(payload:any){
    let api = environment.apiUrl+'auth/signIn';
    let responce = {
      success : false,
      message: ""
    }
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['token']){
          const token = respData['token'];
          const user = respData['user'];
          this.storageService.SetToken(token);
          this.storageService.SetUser(user);
          responce.success = true;
          responce.message = 'Login  Successful.';
        } else if(respData && respData['message']){
          responce.success = false;
          responce.message = respData['message'];
        }else if (respData.hasOwnProperty('error')) {
          if (respData["error"] == "not_confirmed") {
            responce.success = false;
            responce.message = 'User Not Confirmed ';
          } else if (respData["error"] == "user_name_password_does_not_match") {
            responce.success = false;
            responce.message = 'Username password does not match ';
          }else {
            responce.success = false;
            responce.message = 'Username password does not match ';
          }
        }
        return responce;
      },
      (error)=>{
        responce.success = false;
        responce.message = error.error.message;
        return responce;
      }
    )
  }
  async Signup(payload:any){
    let api = environment.apiUrl+'auth/signUp';
    let responce = {
      success : false,
      message: ""
    }
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['message'] == 'User registered successfully'){
          responce.success = true;
          responce.message = "User registered successfully!!!";
        }else{
          responce.success = false;
          responce.message = "User registered successfully!!!";
        }
        return responce;
      },
      (error)=>{
        responce.success = false;
        responce.message = "User registered successfully!!!";
        return responce;
      }
    )
  }
  async sendOtp(payload:any){
    let api = environment.apiUrl+'mobile/send-otp';
    let responce = {
      success : false,
      message: ""
    }
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        responce.success = true;
        responce.message = "User registered successfully!!!";
        return responce;
      },
      (error)=>{
        responce.success = false;
        responce.message = "User registered successfully!!!";
        return responce;
      })

  }
  async verifyOtp(payload:any){
    let api = environment.apiUrl+'mobile/verify-otp';
    let responce = {
      success : false,
      message: ""
    }
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        responce.success = true;
        responce.message = "User registered successfully!!!";
        return responce;
      },
      (error)=>{
        responce.success = false;
        responce.message = "User registered successfully!!!";
        return responce;
      })

  }

}
