import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./auth.guard";
import {IsSignedInGuard} from "./isSignedIn.guard";


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsSignedInGuard]
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
        redirectTo: 'dash',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }