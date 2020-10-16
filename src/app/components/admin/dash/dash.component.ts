import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { title: 'Add an Admin', icon: 'person', cols: 1, rows: 1 },
        { title: 'Add a Resource', icon: 'add_location_alt', cols: 1, rows: 1 },
        { title: 'Add a Category', icon: 'category', cols: 1, rows: 1 },
        { title: 'Upload Resources', icon: 'cloud_upload', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private sanitizer: DomSanitizer,
              private iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon("person-add",
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/person_add-24px.svg'));

    iconRegistry.addSvgIcon('add_location_alt',
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/add_location_alt-24px.svg'));

    iconRegistry.addSvgIcon('category',
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/category-24px.svg'))

    iconRegistry.addSvgIcon('cloud_upload',
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/cloud_upload-24px.svg'))
  }
}
