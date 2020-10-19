import { Component, OnInit } from '@angular/core';
import {RegistrationForm} from "../../../../forms/registration.form";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {User} from "../../../../models/user";

@Component({
  selector: 'create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  registerForm: RegistrationForm
  formSubmitted: boolean
  editing: boolean;
  errors: string [];
  user: User;
  constructor(private authService: AuthService, activatedRoute: ActivatedRoute, private router: Router) {
    this.user = new User();

    this.editing = activatedRoute.snapshot.params["mode"] == 'edit';
    if(this.editing){
      this.authService.getSingleUser(activatedRoute.snapshot.params["id"]).subscribe((userInfo) => {
        Object.assign(this.user, userInfo["data"]);
      });
    }

    this.registerForm = new RegistrationForm();
    this.formSubmitted = false;

    console.log(this.user);
  }

  ngOnInit(): void {
  }

  async registerUser() {
    this.errors = []
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      if (this.registerForm.get("password").value != this.registerForm.get("confirmPassword").value) {
        this.errors.push("Password and Confirm Password do not match!");
        return;
      }

      this.authService.register(this.registerForm.get("firstName").value,
          this.registerForm.get("lastName").value,
          this.registerForm.get("email").value,
          this.registerForm.get("password").value
      ).subscribe((data) => {
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
