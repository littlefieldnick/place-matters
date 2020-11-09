import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {from, Observable} from "rxjs";
import { Resource } from "../models/resource";
import { AppConfigService } from "./app-config.service";
import {ErrorHandlerService} from "./error-handler.service";
import {ResourceCategory} from "../models/resource_category";
import {AuthService} from "./auth.service";
import {County} from "../models/county";

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

  bulkResourceSave(resources: Resource[]){
    let errs = []
    resources.forEach((r) => {
      this.http.post<Resource[]>(this.apiURL + "api/resources/",
          {resource: r}, this.authService.getOptions()).subscribe((data) => {
            if(!data["success"])
              errs.push(r);
      });
    });
    let status = errs.length == 0;
    return  {success: status, errors: errs}
  }

  saveResource(resource: Resource): Observable<Resource> {
    if (resource.id) {
      return this.http.put<Resource>(this.apiURL + "api/resources/" + resource.id,
          {resource: resource}, this.authService.getOptions())
    }

    return this.http.post<Resource>(this.apiURL + "api/resources/",
        {resource: [resource]}, this.authService.getOptions());
  }

  getCounties(): Observable<County>{
    return this.http.get<County>(this.apiURL + 'api/counties');
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
