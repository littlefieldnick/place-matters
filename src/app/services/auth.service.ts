import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {mergeMap, catchError, map} from "rxjs/operators";
import { Observable, throwError, from } from "rxjs";
import { environment } from '../../environments/environment';

export class LoginResponse {
    message: string
    jwt_token: string
    refresh_token: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiRoute: string;
    constructor(private http: HttpClient) {
        this.apiRoute = (environment.external_api || "/");
    }

    // Handle authentication errors
    private errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error(`authentication error: ${error.error.message}`);
        } else {
            console.error(`bad auth response: ${error.status}: ${error.statusText} ${JSON.stringify(error.error)}`);
        }
        return throwError('Login attempt failed');
    }

    async loginUser(userEmail, userPass) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        let loginUser = {
            email: userEmail,
            password: userPass
        };

        return await this.http.post(this.apiRoute + "api/auth/login", loginUser, httpOptions)
            .toPromise().then(data => {
                localStorage.setItem("accessToken", data["token"])
                return data["success"];
            });
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

        return await this.http.post(this.apiRoute + "api/users/register", user, httpOptions)
            .toPromise().then(data => data["success"]);
    }

    verifyJWT(jwtToken){
        let headers = new HttpHeaders({
            authorization: "Bearer " + jwtToken
        })
        console.log(this.apiRoute + "api/auth/verify");
        return this.http.post(this.apiRoute + "api/auth/verify", {}, {headers: headers}).toPromise();
    }

    async isAuthenticated(): Promise<boolean>{
        let jwtToken = localStorage.getItem("accessToken");
        console.log(jwtToken);
        let verified = false;

        return this.verifyJWT(jwtToken).then(authenticated => authenticated["success"]);

    }
}
