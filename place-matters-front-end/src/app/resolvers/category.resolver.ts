import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { CategoryService } from "../services/category.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve <Observable<any>>{

  constructor(private categoryDs: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.categoryDs.getCategories().pipe(
      map(data => {
        return data;
      })
    )
  }
}
