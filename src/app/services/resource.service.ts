import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../models/resource";
import {AppConfigService} from "./app-config.service";
import {map} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  apiURL: string = this.appConfigService.externalApi || '/';
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
              private appConfigService: AppConfigService) {
  }


  getResource(id?): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    if(id)
      return this.http.get<Resource>(this.apiURL + 'api/resources/' + id, {headers})

    return this.http.get<Resource>(this.apiURL + 'api/resources/', {headers});
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
