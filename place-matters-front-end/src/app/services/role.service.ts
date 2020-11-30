import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfigService} from "./app-config.service";
import {catchError, map} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class RoleService {
    apiURL: string = this.appConfigService.externalApi || '/';

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
                private appConfigService: AppConfigService) {

    }

    getRole(id?: number) {
        const headers = new HttpHeaders().set('Content-Type', 'application-json')
        if (id) {
            return this.http.get(this.apiURL + 'api/roles/' + id).pipe(map((role) => {
                return role["data"];
            }), catchError((err) => {
                return this.errorHandler.processServerError(err);
            }))
        }

        return this.http.get(this.apiURL + 'api/roles/', {headers}).pipe(map(data => {
            return data["data"];
        }), catchError((err) => {
            return this.errorHandler.processServerError(err);
        }));
    }
}