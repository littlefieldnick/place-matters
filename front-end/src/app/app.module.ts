import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {GoogleMapsModule} from "@angular/google-maps";
import { ResourceInfoComponent } from './components/resource-info/resource-info.component';
import {MapContainerDirective} from "./directives/map-container.directive";
import {LayoutModule} from "@angular/cdk/layout";
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    MapContainerDirective, AppComponent, MainComponent, ResourceInfoComponent, MapComponent
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
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ScrollingModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
