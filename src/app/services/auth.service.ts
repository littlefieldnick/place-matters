import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiRoute: string;
    constructor(private http: HttpClient) {
        this.apiRoute = (environment.external_api || "/");
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
        let jwtToken = localStorage.getItem("accessToken");
        console.log(jwtToken);

        return this.verifyJWT(jwtToken).pipe(
            catchError(err => {
                let errMsg = this.processServerError(err);
                return throwError(errMsg);
            })
        );
    }

    private processServerError(err: HttpErrorResponse): string{
        let errMsg: string;
        if(err.error instanceof ErrorEvent){
            errMsg = 'Error: ' + err.error.message;
        } else {
            errMsg = this.getServerErrorMessage(err);
        }

        return errMsg;
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 401: {
                return `Unauthorized: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }
        }
    }
}
