import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
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
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }