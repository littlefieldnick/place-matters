import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../models/resource";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  apiURL: string = this.appConfigService.externalApi || '/';
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    console.log(this.appConfigService.externalApi);
  }

  getAllResources(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')

    return this.http.get<Resource>(this.apiURL + 'api/resources/', {headers})
  }

  getResource(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get<Resource>(this.apiURL + 'api/resources/' + id, {headers})
  }

  searchResources(name: string, category: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    let params = {};

    if(name.length > 0) {
      params["name"] = name
    }

    if(category.length > 0){
      params["category"] = category
    }
    return this.http.get<Resource>(this.apiURL +"api/resources/search",
      {headers: headers, params: params})
  }

}
