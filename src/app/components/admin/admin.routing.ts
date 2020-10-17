import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./auth.guard";
import {IsSignedInGuard} from "./isSignedIn.guard";
import {MainViewComponent} from "./view/main-view.component";


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
        path: 'view/:tabName', //Tab name is used to activate a given tab
        component: MainViewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/add',
        component: RegistrationComponent,
        canActivate:[AuthGuard]

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