import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AuthGuard {
    constructor(private router: Router,
                private auth: AuthService) { }

     canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

            return this.auth.isAuthenticated().pipe(map(isAuth => {
                    if(isAuth) {
                        return true;
                    } else {
                        this.router.navigateByUrl('admin/login');
                        return false;
                    }
                }),
                catchError(err => {
                    this.router.navigateByUrl('admin/login');
                    return of(false);
                })
            );
    }
}
