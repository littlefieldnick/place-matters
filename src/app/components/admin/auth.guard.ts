import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot,
    Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private auth: AuthService) { }

     canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve) => {
            this.auth.isAuthenticated().then(isAuth =>  {
                if(isAuth) {
                    resolve(true);
                } else {
                    this.router.navigateByUrl('admin/login');
                    resolve(false);
                }
            });
        });
    }
}
