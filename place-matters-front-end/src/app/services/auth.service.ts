import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {AppConfigService} from "./app-config.service";
import {User} from "../models/user";
import {ErrorHandlerService} from "./error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiRoute: string;

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, private appConfigService: AppConfigService) {
        this.apiRoute = appConfigService.externalApi || "/";
    }

    loginUser(userEmail, userPass) {
        let loginUser = {
            email: userEmail,
            password: userPass
        };

        return this.http.post(this.apiRoute + "auth/login", loginUser).pipe(
            catchError(err => {
                let errMsg = this.errorHandler.processServerError(err);
                return throwError(errMsg);
            })
        );
    }

    saveUser(user: User) {
        if (user.id) {
            return this.http.put(this.apiRoute + "api/users/" + user.id, {user: user}, this.getOptions())
                .pipe(catchError((err) => {
                    return this.errorHandler.processServerError(err);
                }));
        }

        return this.http.post(this.apiRoute + "api/users/", {user: user}, this.getOptions())
            .pipe(catchError(err => {
                return this.errorHandler.processServerError(err);
            }));
    }

    getUser(id?: number) {
        if (id) {
            return this.http.get(this.apiRoute + "api/users/" + id, this.getOptions())
                .pipe(map((users: User) => {
                    return users["data"];
                }));
        }

        return this.http.get(this.apiRoute + "api/users", this.getOptions())
            .pipe(map((users: Array<User>) => {
                return users["data"];
            }));
    }

    getJWTTokenFromStorage() {
        return localStorage.getItem("accessToken");
    }

    logoutUser() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUser");
    }

    isAuthenticated() {
        let jwtToken = this.getJWTTokenFromStorage();

        let headers = new HttpHeaders({
            authorization: "Bearer " + jwtToken
        });

        let user = JSON.parse(localStorage.getItem("loggedInUser"));

        return this.http.post(this.apiRoute + "auth/verify", {}, this.getOptions()).pipe(
            map((auth) => {
                if (auth["success"] && auth["decoded"]["data"] == user.email) {
                    return true;
                }

                return false;
            }),
            catchError(err => {
                let errMsg = this.errorHandler.processServerError(err);
                //An error occurred, user is no longer authenticated (JWTTokenExpiration error)
                if(localStorage.getItem("loggedInUser"))
                    localStorage.removeItem("loggedInUser");
                return throwError(errMsg);
            })
        );
    }

    getOptions() {
        return {
            headers: new HttpHeaders({
                Authorization: "Bearer " + this.getJWTTokenFromStorage()
            })
        }
    }
}
