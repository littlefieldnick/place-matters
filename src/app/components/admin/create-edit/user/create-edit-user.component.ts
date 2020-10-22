import {Component, OnInit} from '@angular/core';
import {RegistrationForm} from "../../../../forms/registration.form";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {User} from "../../../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";

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

    constructor(private authService: AuthService, activatedRoute: ActivatedRoute, private router: Router,
                private snackBar: MatSnackBar) {
        this.registerForm = new RegistrationForm();
        this.formSubmitted = false;
        this.user = new User();
        this.editing = activatedRoute.snapshot.params["mode"] == 'edit';


        if (this.editing) {
            this.authService.getUser(activatedRoute.snapshot.params["id"]).subscribe((userInfo: User) => {
                Object.assign(this.user, userInfo);
                Object.keys(this.user).forEach((p => {
                    if (this.registerForm.contains(p)) {
                        this.registerForm.controls[p].setValue(this.user[p]);
                    }
                }));
            });
        }
    }

    ngOnInit(): void {

    }

    submitForm() {
        this.formSubmitted = true;

        if (this.registerForm.get("password").value != this.registerForm.get("confirmPassword").value) {
            this.displayServerError("Passwords entered do not match!");
            return;
        }

        Object.keys(this.registerForm.controls).forEach((c) => {
            console.log(c);
            this.user[c] = this.registerForm.controls[c].value
        });

        if (this.registerForm.valid) {
            this.authService.saveUser(this.user).pipe(catchError(err => {
                this.displayServerError(err);
                return of([]);
            })).subscribe((res) => {
                if (res["success"]) {
                    this.router.navigate(["admin/view/users"]);
                }
            });
        }
    }

    displayServerError(err: string) {
        this.snackBar.open(err, undefined, {
            verticalPosition: "top",
        });
    }
}
