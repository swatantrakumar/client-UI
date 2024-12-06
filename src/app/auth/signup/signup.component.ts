import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/service/auth-api/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;
  constructor(
    private authApiService:AuthApiService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
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
    let signup = await this.authApiService.Signup(value);
    console.log(signup);
  }

  get signUpControl() {
    return this.signUpForm.controls;
  }

}
