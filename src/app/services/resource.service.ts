import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from "../models/resource";
import { environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  apiURL: string = environment.external_api || '/';
  constructor(public http: HttpClient) {}

  getAllResources(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')

    return this.http.get<Resource>('api/resources/', {headers})
  }

  getResource(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application-json')
    return this.http.get<Resource>('api/resources/' + id, {headers})
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
    return this.http.get<Resource>("api/resources/search",
      {headers: headers, params: params})
  }

}
