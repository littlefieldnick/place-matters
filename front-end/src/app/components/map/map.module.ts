import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {AgmCoreModule} from "@agm/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MapComponent} from "./map.component";
import {CommonModule} from "@angular/common";
import { environment} from "../../../environments/environment";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gm_api //Replace me
    }),
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ScrollingModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
  ], exports: [MapComponent]
})

export class MapModule { }
