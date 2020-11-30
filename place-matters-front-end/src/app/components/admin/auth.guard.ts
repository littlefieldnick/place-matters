import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AuthGuard {
    constructor(private auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        return this.auth.isAuthenticated().pipe(map(isAuth => {
                //Restrict access to user listings, creation, and edits
                if (state.url.toString() === "/admin/users/add" || state.url.toString() === "/admin/view/users") {
                    if (isAuth && user.roles[0].name == "ADMIN")
                        return true;
                    else
                        return false;
                }

                if (isAuth) {
                    return true;
                } else {
                    return false;
                }
            }),
            catchError(err => {
                return of(false);
            })
        );
    }
}
