import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiRoute: string;
    constructor(private http: HttpClient) {
        this.apiRoute = (environment.external_api || "/");
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

        return this.http.post(this.apiRoute + "auth/login", loginUser)
            .toPromise().then(data => {
                localStorage.setItem("accessToken", data["token"])
                return data["success"];
            }).catch(err => console.log(err));
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
        return this.http.post(this.apiRoute + "auth/verify", {}, {headers: headers}).toPromise();
    }

    async isAuthenticated() {
        let jwtToken = localStorage.getItem("accessToken");
        console.log(jwtToken);
        let verified = false;

        await this.verifyJWT(jwtToken).then(authenticated => verified = authenticated["success"]);
        return verified;
    }
}
