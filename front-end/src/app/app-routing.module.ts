import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {ResourceResolver} from "./resolvers/resource.resolver";
import {CategoryResolver} from "./resolvers/category.resolver";
import {ResourceInfoComponent} from "./components/resource-info/resource-info.component";
import {SingleResourceResolver} from "./resolvers/single-resource.resolver";

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    resolve: {
      resources: ResourceResolver,
      categories: CategoryResolver
    }
  },
  {
    path: 'info/:id',
    component: ResourceInfoComponent,
    resolve: {
      id: SingleResourceResolver
    }
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
