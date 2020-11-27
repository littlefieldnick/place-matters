import { Component, OnInit } from '@angular/core';
import {LoginForm} from "../../../forms/login.form";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm
  formSubmitted: boolean;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
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
        this.displayServerError(err);
        return of([])
      })).subscribe((response) => {
        if (response["success"]) {
          this.snackBar.dismiss(); //dismiss server error if open
          localStorage.setItem("accessToken", response["token"]);
          this.router.navigateByUrl("admin/dash");
        }
      });
    }
  }

  displayServerError(err:string){
    this.snackBar.open(err, undefined,{
      verticalPosition: "top",
    });
  }
}
