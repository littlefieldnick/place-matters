import { NgModule } from '@angular/core';
import {Routes, RouterStateSnapshot, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./auth.guard";
import {IsSignedInGuard} from "./isSignedIn.guard";
import {MainViewComponent} from "./view/main-view.component";
import {CreateEditResourceComponent} from "./create-edit/resource/create-edit-resource.component";
import {CreateEditCategoryComponent} from "./create-edit/category/create-edit-category.component";
import {CreateEditUserComponent} from "./create-edit/user/create-edit-user.component";
import {CategoryResolver} from "../../resolvers/category.resolver";
import {ResourceCsvUploadComponent} from "./resource-csv-upload/resource-csv-upload.component";


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsSignedInGuard]
    },
    {
        path: 'view', //No tab name given will activate the first tab
        component: MainViewComponent,
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
        path: 'view/:tabName', //Tab name is used to activate a given tab
        component: MainViewComponent,
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