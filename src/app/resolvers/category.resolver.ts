import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { CategoryService } from "../services/category.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve <Observable<any>>{

  constructor(private categoryDs: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.categoryDs.getCategories().pipe(
      take(1),
      map(data => data.categories)
    )
  }
}
