import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResourceCategory } from "../models/resource_category";


@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  constructor(public http: HttpClient) {

  }

  getAllResourceCategories(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get<ResourceCategory>('http://192.168.1.23:5000/categories/', {headers})
  }
}
