import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm!:FormGroup;

  constructor(
    private authApiService:AuthApiService,
    private formBuilder:FormBuilder,
    private router:Router,
    private notifierService:NotifierService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signInForm = this.formBuilder.group({
      "email": ["",[Validators.required,Validators.email]],
      "password": ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]]
    })
  }
  async signin() {
    let value = this.signInForm.getRawValue();
    let signin:any = await this.authApiService.Signin(value);
    if(signin && signin.success){
      this.notifierService.notify("success",signin.message);
      this.signInForm.reset();
      this.router.navigate(['/'])
    }else{
      this.notifierService.notify('error',signin.message);
    }
  }
  get signInControl() {
    return this.signInForm.controls;
  }

}
