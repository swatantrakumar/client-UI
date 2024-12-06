import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder:FormBuilder
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
    let signin = await this.authApiService.Signin(value);
    console.log(signin);
  }
  get signInControl() {
    return this.signInForm.controls;
  }

}
