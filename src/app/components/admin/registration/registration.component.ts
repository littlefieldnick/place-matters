import { Component, OnInit } from '@angular/core';
import {RegistrationForm} from "../../../forms/registration.form";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: RegistrationForm
  formSubmitted: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new RegistrationForm();
    this.formSubmitted = false;
  }

  ngOnInit(): void {
  }

  async registerUser() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      if (this.registerForm.get("password").value != this.registerForm.get("confirmPassword").value) {
        console.log("Passwords do not match!");
        return;
      }

      this.authService.register(this.registerForm.get("firstName").value,
        this.registerForm.get("lastName").value,
        this.registerForm.get("email").value,
        this.registerForm.get("password").value
      ).then((data) => {
        if(!data)
          return;

        this.authService.loginUser(
          this.registerForm.get("email").value,
          this.registerForm.get("password").value
        ).subscribe(data => {
          if(data)
            this.router.navigateByUrl("/admin/dash");
        }, catchError(err => of(err)));
      });
    }

  }
}
