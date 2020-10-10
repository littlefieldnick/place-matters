import { Component, OnInit } from '@angular/core';
import {LoginForm} from "../../../forms/login.form";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm
  formSubmitted: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new LoginForm()
    this.formSubmitted = false;
  }

  ngOnInit(): void {
  }

  loginUser(){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.authService.loginUser(
        this.loginForm.get("email").value,
        this.loginForm.get("password").value
      ).then((data) => {
          console.log(data);
          if(data)
            this.router.navigateByUrl("admin/dash");
      });
    }
  }

}
