import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ResourceResolver} from "./resolvers/resource.resolver";
import {CategoryResolver} from "./resolvers/category.resolver";
import {ResourceInfoComponent} from "./components/resource-info/resource-info.component";
import {SingleResourceResolver} from "./resolvers/single-resource.resolver";
import {CountyResolver} from "./resolvers/county.resolver";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      resources: ResourceResolver,
      counties: CountyResolver,
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
    path: "admin",
    loadChildren: () => import("./components/admin/admin.module")
        .then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
