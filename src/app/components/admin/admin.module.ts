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
import { MainViewComponent } from './view/main-view.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ResourceCsvUploadComponent } from './resource-csv-upload/resource-csv-upload.component';
import { ResourceViewComponent } from './view/resource-view/resource-view.component';
import { CategoryViewComponent } from './view/category-view/category-view.component';
import { AdminViewComponent } from './view/admin-view/admin-view.component';


@NgModule({
    imports: [CommonModule,
        LayoutModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AdminRoutingModule],
    providers: [AuthGuard, IsSignedInGuard],
    declarations: [DashComponent, LoginComponent, RegistrationComponent, MainViewComponent, CreateEditComponent, ResourceCsvUploadComponent, ResourceViewComponent, CategoryViewComponent, AdminViewComponent]
})
export class AdminModule {}