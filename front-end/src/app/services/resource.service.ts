import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../models/resource";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(public http: HttpClient) {

  }

  getAllResources(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get<Resource>('http://localhost:5000/resources/', {headers})
  }

}
