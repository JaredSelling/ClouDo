import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TodosProvider } from '../../providers/todos/todos';
import { ValidateProvider } from '../../providers/validate/validate';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    public nav: NavController,
    public http: Http,
    public todoService: TodosProvider,
    public validateService: ValidateProvider,
    public flashMessage: FlashMessagesService
  ) {

  }

  register(){

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      if(this.validateService.signupEmptyFields(user)) {
        if(this.validateService.signupPasswordLength(user)) {
          if(this.validateService.validateEmail(user)) {
            if(this.validateService.signupPasswordMatch(user)) {
              this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
                .subscribe(res => {
                  this.todoService.init(res.json());
                  this.nav.setRoot(HomePage);
                }, (err) => {
                  console.log(err);
                });
            } else {
              this.flashMessage.show('Passwords must match.', {timeout: 3000});
            }
          } else {
            this.flashMessage.show('Please enter a valid email.', {timeout: 3000});
          }
        } else {
          this.flashMessage.show('Password must be at least 6 characters.', {timeout: 3000});
        }
      } else {
        this.flashMessage.show('Please fill out all fields.', {timeout: 3000});
      }



  }

}
