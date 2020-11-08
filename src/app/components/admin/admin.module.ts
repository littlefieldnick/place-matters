import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import {DashComponent} from "./dash/dash.component";
import {LoginComponent} from "./login/login.component";
import {AdminRoutingModule} from "./admin.routing";
import {MaterialModule} from "../../app-material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LayoutModule} from "@angular/cdk/layout";
import {IsSignedInGuard} from "./isSignedIn.guard";
import { MainViewComponent } from './view/main-view.component';
import { ResourceCsvUploadComponent } from './resource-csv-upload/resource-csv-upload.component';
import { ResourceViewComponent } from './view/resource-view/resource-view.component';
import { CategoryViewComponent } from './view/category-view/category-view.component';
import { AdminViewComponent } from './view/admin-view/admin-view.component';
import { CreateEditUserComponent } from './create-edit/user/create-edit-user.component';
import { CreateEditResourceComponent } from './create-edit/resource/create-edit-resource.component';
import { CreateEditCategoryComponent } from './create-edit/category/create-edit-category.component';
import { UploadDialogComponent } from './resource-csv-upload/upload-dialog/upload-dialog.component';

@NgModule({
    imports: [CommonModule,
        LayoutModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AdminRoutingModule],
    providers: [AuthGuard, IsSignedInGuard],
    declarations: [DashComponent, LoginComponent,
        MainViewComponent, ResourceCsvUploadComponent,
        ResourceViewComponent, CategoryViewComponent, AdminViewComponent,
        CreateEditUserComponent, CreateEditResourceComponent, CreateEditCategoryComponent, UploadDialogComponent]
})
export class AdminModule {}