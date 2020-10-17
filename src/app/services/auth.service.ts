import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {catchError, map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {AppConfigService} from "./app-config.service";
import {User} from "../models/user";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiRoute: string;
    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
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
                let errMsg = this.processServerError(err);
                return throwError(errMsg);
            })
        );
    }

    async register(firstName, lastName, email, password){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        return this.http.post(this.apiRoute + "api/users/register", user, httpOptions)
            .pipe(
                catchError(err => {
                    let errMsg = this.processServerError(err);
                    return throwError(errMsg);
                })
            );
    }

    getJWTTokenFromStorage(){
        return localStorage.getItem("accessToken");
    }

    verifyJWT(jwtToken){
        let headers = new HttpHeaders({
            authorization: "Bearer " + jwtToken
        })
        return this.http.post(this.apiRoute + "auth/verify", {}, {headers: headers}).pipe(
            catchError(err => {
                let errMsg = this.processServerError(err);
                return throwError(errMsg);
            })
        );
    }

    isAuthenticated() {
        let jwtToken = this.getJWTTokenFromStorage();

        return this.verifyJWT(jwtToken).pipe(
            catchError(err => {
                let errMsg = this.processServerError(err);
                return throwError(errMsg);
            })
        );
    }

    getAllUsers(){
        let headers = new HttpHeaders({
            authorization: "Bearer " + this.getJWTTokenFromStorage()
        });

        return this.http.get(this.apiRoute + "api/users", {headers: headers})
            .pipe(map((users: Array<User>) => {
                console.log(users);
                return users["data"];
            }));
    }

    private processServerError(err: HttpErrorResponse): string{
        let errMsg: string;
        if(err.error instanceof ErrorEvent){
            errMsg = 'Error: ' + err.message;
        } else {
            errMsg = err.error.errors;
        }

        return errMsg;
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.error.errors}`;
            }
            case 403: {
                return `Access Denied: ${error.error.errors}`;
            }
            case 401: {
                return `Unauthorized: ${error.error.errors}`;
            }
            case 500: {
                return `Internal Server Error: ${error.error.errors}`;
            }
            default: {
                return `Unknown Server Error: ${error.error.errors}`;
            }
        }
    }
}
