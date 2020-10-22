import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../models/resource";
import {AppConfigService} from "./app-config.service";
import {ErrorHandlerService} from "./error-handler.service";
import {ResourceCategory} from "../models/resource_category";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  apiURL: string = this.appConfigService.externalApi || '/';
  constructor(private http: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService,
              private appConfigService: AppConfigService) {
  }

  getResources(id?): Observable<Resource>{
    if(id)
      return this.http.get<Resource>(this.apiURL + 'api/resources/' + id)

    return this.http.get<Resource>(this.apiURL + 'api/resources/');
  }

  saveResource(resource: Resource): Observable<Resource> {
    if (resource.id) {
      return this.http.put<Resource>(this.apiURL + "api/resource/" + resource.id,
          {resource: resource}, this.authService.getOptions())
    }

    return this.http.post<Resource>(this.apiURL + "api/resource/",
        {resource: resource}, this.authService.getOptions());
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
