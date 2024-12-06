import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  TOKEN: string = 'ID_TOKEN';
  USER: string = 'USER';

constructor() { }

  SetToken(token: any) {
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }
  GetToken() {
    let obj = JSON.parse(<any>localStorage.getItem(this.TOKEN));
    if(obj && obj != null ){
      return obj;
    }else{
      return null;
    }
  }
  SetUser(user: any) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }
  GetUser() {
    let user = JSON.parse(<any>localStorage.getItem(this.USER));
    if(user && user != null ){
      return user;
    }else{
      return null;
    }
  }

}
