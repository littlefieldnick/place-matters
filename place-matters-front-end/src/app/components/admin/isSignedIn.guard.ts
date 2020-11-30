import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class IsSignedInGuard {
    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        return this.auth.isAuthenticated().pipe(map(isAuth => {
                //Is already authenticated, no need to sign in
                if(isAuth) {
                    this.router.navigateByUrl('admin/dash');
                    return false;
                }

                //Not authenticated, needs to sign in
                return true;
            }),
            catchError(err => {
                //Could not verify, needs to sign in
                return of(true);
            })
        );
    }
}
