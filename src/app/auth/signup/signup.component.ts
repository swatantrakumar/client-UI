import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm!:FormGroup;
  constructor(
    private authApiService:AuthApiService,
    private formBuilder:FormBuilder,
    private router:Router,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.signUpForm.reset();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      "name": ["",[Validators.required]],
      "email" : ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
      "mobileNumber" : ['', [Validators.required,Validators.pattern(/^[0-9]*$/),Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  async signup() {
    let value = this.signUpForm.getRawValue();
    let signup:any = await this.authApiService.Signup(value);
    if(signup.success){
      this.notifierService.notify('success',signup.message);
      this.signUpForm.reset();
      this.router.navigate(['signin'])
    }else{
      this.notifierService.notify('error',signup.message);
    }
  }

  get signUpControl() {
    return this.signUpForm.controls;
  }

}
