import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ResourceResolver} from "./resolvers/resource.resolver";
import {CategoryResolver} from "./resolvers/category.resolver";
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
