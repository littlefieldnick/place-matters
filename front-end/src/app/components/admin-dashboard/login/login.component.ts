import { Component, OnInit } from '@angular/core';
import {LoginForm} from "../../../forms/login.form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm
  errors: string = "";
  primary: string = 'primary'
  constructor() {
    this.loginForm = new LoginForm()
  }

  ngOnInit(): void {
  }

  loginUser(){
    if(this.loginForm.valid){

    } else {
      this.errors += 'Authentication failed.';
    }
  }

}
