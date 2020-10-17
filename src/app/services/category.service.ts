import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResourceCategory } from "../models/resource_category";
import { environment} from "../../environments/environment";
import {AppConfigService} from "./app-config.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  apiURL: string = this.appConfigService.externalApi || '/';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {

  }

  getAllResourceCategories(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get(this.apiURL + 'api/categories/', {headers})
        .pipe(map((categories) => {
                return categories["data"];
        }));
  }
}
