import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';


import { SignInRequestModel } from 'src/app/models/RequestModel';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  payload: SignInRequestModel = {
    email: '',
    password: '',
  };
  //handek form   :

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submit() {
    this.SignInRequest();
  }

  SignInRequest() {
    this.authService.singInAdmin(this.payload).subscribe(
      (res: { role: any; }) => {
        console.log('res ');
        console.log(res);
        localStorage.setItem('role', JSON.stringify(res.role));
        alert('login Sucess');
        this.router.navigate(['home']);
      },
      (err: HttpErrorResponse) => {
        alert(err.error.message);
      }
    );
  }
}

 