import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class IsSignedInGuard {
    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        return this.auth.isAuthenticated().pipe(map(isAuth => {
                if(isAuth) {
                    this.router.navigateByUrl('admin/dash');
                    return false;
                }

                return true;
            }),
            catchError(err => {
                return of(true);
            })
        );
    }
}
