import { Component, OnInit } from '@angular/core';
import {LoginForm} from "../../../forms/login.form";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of, throwError} from "rxjs";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm
  formSubmitted: boolean;
  errMsg: string;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new LoginForm()
    this.formSubmitted = false;
  }

  ngOnInit(): void {
  }

  loginUser(){
    this.formSubmitted = true;
    if(this.loginForm.valid) {
      this.authService.loginUser(
          this.loginForm.get("email").value,
          this.loginForm.get("password").value
      ).pipe(catchError(err => {
        this.errMsg = err;
        return of([])
      })).subscribe((response) => {
        console.log(response);
        if (response["success"]) {
          localStorage.setItem("accessToken", response["token"]);
          this.router.navigateByUrl("admin/dash");
        }
      });
    }
  }

}
