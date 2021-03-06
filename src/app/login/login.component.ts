import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({'email': this.emailFormControl, 'password': this.passwordFormControl});
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._userService.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          console.log(jwt_decode(localStorage.getItem('token')));
          localStorage.setItem('email', jwt_decode(localStorage.getItem('token')).sub);
          this._userService.userSubject.next(localStorage.getItem('email'));
          if (localStorage.getItem('email') === 'admin@gmail.com') {
            this._router.navigate(['admin-incidents']);
          } else {
            this._router.navigate(['report-incident']);
          }
        }
      );
    }
  }
}
