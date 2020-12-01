import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./auth.guard";
import {IsSignedInGuard} from "./isSignedIn.guard";
import {CreateEditResourceComponent} from "./create-edit/resource/create-edit-resource.component";
import {CreateEditCategoryComponent} from "./create-edit/category/create-edit-category.component";
import {CreateEditUserComponent} from "./create-edit/user/create-edit-user.component";
import {CategoryResolver} from "../../resolvers/category.resolver";
import {ResourceCsvUploadComponent} from "./resource-csv-upload/resource-csv-upload.component";
import {ResourceViewComponent} from "./view/resource-view/resource-view.component";
import {CategoryViewComponent} from "./view/category-view/category-view.component";
import {AdminViewComponent} from "./view/admin-view/admin-view.component";


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsSignedInGuard]
    },
    {
        path: 'resources/view', //No tab name given will activate the first tab
        component: ResourceViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'resources/upload',
        component: ResourceCsvUploadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'resources/:mode',
        component: CreateEditResourceComponent,
        canActivate: [AuthGuard],
        resolve: {
            categories: CategoryResolver
        }
    },
    {
        path: 'resources/:mode/:id',
        component: CreateEditResourceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories/view',
        component: CategoryViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories/:mode',
        component: CreateEditCategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories/:mode/:id',
        component: CreateEditCategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/view',
        component: AdminViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:mode',
        component: CreateEditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:mode/:id',
        component: CreateEditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dash',
        component: DashComponent,
        canActivate:[AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dash',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}