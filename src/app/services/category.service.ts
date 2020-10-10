import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResourceCategory } from "../models/resource_category";
import { environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  apiURL: string = environment.external_api || '/';

  constructor(public http: HttpClient) {

  }

  getAllResourceCategories(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get<ResourceCategory>(this.apiURL + 'api/categories/', {headers})
  }
}
