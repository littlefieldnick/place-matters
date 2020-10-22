import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResourceCategory} from "../models/resource_category";
import {AppConfigService} from "./app-config.service";
import {catchError, map} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiURL: string = this.appConfigService.externalApi || '/';

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
                private authService: AuthService, private appConfigService: AppConfigService) {

    }

    getCategories(id?: number) {
        const headers = new HttpHeaders().set('Content-Type', 'application-json')
        if (id) {
            return this.http.get(this.apiURL + 'api/categories/' + id).pipe(map((cat) => {
                console.log(cat);
                return cat["data"];
            }), catchError((err) => {
                return this.errorHandler.processServerError(err);
            }))
        }

        return this.http.get(this.apiURL + 'api/categories/', {headers}).pipe(map(data => {
            return data["data"];
        }), catchError((err) => {
            return this.errorHandler.processServerError(err);
        }));
    }

    saveCategory(category: ResourceCategory): Observable<ResourceCategory> {

        if (category.id) {
            return this.http.put<ResourceCategory>(this.apiURL + "api/categories/" + category.id,
                {category: category}, this.authService.getOptions())
        }

        return this.http.post<ResourceCategory>(this.apiURL + "api/categories/",
            {category: category}, this.authService.getOptions());
    }


}
