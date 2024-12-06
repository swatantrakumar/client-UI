import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VerifyMobileComponent } from './auth/verify-mobile/verify-mobile.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AuthInterceptor } from './interceptors/auth.interceptor';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right', // Position to the right
      distance: 12,      // Distance from the right edge
    },
    vertical: {
      position: 'top',   // Position to the top
      distance: 12,      // Distance from the top edge
    },
  },
  theme: 'material',      // Theme for the notifications
  behaviour: {
    autoHide: 5000,       // Auto-hide after 5 seconds
    onClick: false,       // Do not hide on click
    showDismissButton: true, // Show a close button
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',    // Animation preset when showing notifications
      speed: 300,
    },
    hide: {
      preset: 'fade',     // Animation preset when hiding notifications
      speed: 300,
    },
    shift: {
      speed: 300,         // Speed of shifting animations
    },
    overlap: 150,         // Overlap duration between animations
  },
};
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomePageComponent,
    VerifyMobileComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
