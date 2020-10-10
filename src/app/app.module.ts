import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {GoogleMapsModule} from "@angular/google-maps";
import { ResourceInfoComponent } from './components/resource-info/resource-info.component';
import {MapContainerDirective} from "./directives/map-container.directive";
import {LayoutModule} from "@angular/cdk/layout";
import { MapComponent } from './components/map/map.component';
import {MaterialModule} from "./app-material/material.module";

@NgModule({
  declarations: [
    MapContainerDirective,
      AppComponent,
      MainComponent,
      ResourceInfoComponent,
      MapComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        LayoutModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CommonModule,
        GoogleMapsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
