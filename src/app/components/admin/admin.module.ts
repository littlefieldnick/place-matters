import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import {DashComponent} from "./dash/dash.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AdminRoutingModule} from "./admin.routing";
import {MaterialModule} from "../../app-material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LayoutModule} from "@angular/cdk/layout";
import {IsSignedInGuard} from "./isSignedIn.guard";


@NgModule({
    imports: [CommonModule,
        LayoutModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AdminRoutingModule],
    providers: [AuthGuard, IsSignedInGuard],
    declarations: [DashComponent, LoginComponent, RegistrationComponent]
})
export class AdminModule {}