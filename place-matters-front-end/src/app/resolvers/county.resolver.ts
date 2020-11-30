import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import {ResourceService} from "../services/resource.service";

@Injectable({
    providedIn: 'root'
})
export class CountyResolver implements Resolve <Observable<any>>{

    constructor(private resourceService: ResourceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        console.log("COUNTY RESOLVER");
        return this.resourceService.getCounties().pipe(
            map(data => {
                console.log(data);
                return data;
            })
        )
    }
}
