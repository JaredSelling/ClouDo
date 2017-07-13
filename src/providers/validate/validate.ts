import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ValidateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ValidateProvider {

  constructor(public http: Http) {
    console.log('Hello ValidateProvider Provider');
  }



  signupEmptyFields(user) {
    if(user.username == undefined || user.email == undefined || user.password == undefined) {
      console.log("Please fill out all fields.");
      return false;
    }
    return true;
  }

  signupPasswordLength(user){
    if(user.password.length < 6) {
      console.log("Password must be at least 6 characters.");
      return false;
    }
    return true;
  }

  signupPasswordMatch(user){
    if(user.password !== user.confirmPassword) {
      console.log("Passwords must match.");
      return false;
    }
    return true;
  }

  validateEmail(user) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(user.email);
  }



}
