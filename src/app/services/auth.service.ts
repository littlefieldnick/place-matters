import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            authorization: 'Bearer ' + this.getJWTTokenFromStorage()
        }

        if (user.id) {
            return this.http.put(this.apiRoute + "api/users/" + user.id, {user: user}, httpOptions)
                .pipe(catchError((err) => {
                    return this.errorHandler.processServerError(err);
                }));
        }

        return this.http.post(this.apiRoute + "api/users/", {user: user}, httpOptions)
            .pipe(catchError(err => {
                return this.errorHandler.processServerError(err);
            }));
    }

    getUser(id?: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            authorization: "Bearer " + this.getJWTTokenFromStorage()
        })

        if(id){
            return this.http.get(this.apiRoute + "api/users/" + id, {headers: headers})
                .pipe(map((users: User) => {
                    return users["data"];
                }))
        }

        return this.http.get(this.apiRoute + "api/users", {headers: headers})
            .pipe(map((users: Array<User>) => {
                return users["data"];
            }));

    }

    getJWTTokenFromStorage() {
        return localStorage.getItem("accessToken");
    }

    isAuthenticated() {
        let jwtToken = this.getJWTTokenFromStorage();

        let headers = new HttpHeaders({
            authorization: "Bearer " + jwtToken
        })

        return this.http.post(this.apiRoute + "auth/verify", {}, {headers: headers}).pipe(
            catchError(err => {
                let errMsg = this.errorHandler.processServerError(err);
                return throwError(errMsg);
            })
        );
    }
}
