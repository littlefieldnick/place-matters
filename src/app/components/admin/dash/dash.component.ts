import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row **/
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { section: "Resources",
          routes:[
            {title:"View Resources", icon: "location_on", cols: 1, rows: 1, route: "admin/resources", tooltip: "View, edit, or delete a resource"},
            {title: "Add Resources", icon: "add_location_alt", cols: 1, rows: 1, route: "admin/resources/add", tooltip: "Add a new resource"},
            {title: "Upload Resources", icon: "cloud_upload", cols: 1, rows: 1, route: "admin/resources/upload", tooltip: "Upload a CSV containing multiple resources"}
          ]
        },
        { section: 'Categories',
          routes:[
            {title: "View Categories",icon: "category", cols: 1, rows: 1, route: "admin/categories", tooltip: "View, edit, or delete a category"},
            {title: "Add Categories", icon: "add", cols: 1, rows: 1,route: "admin/categories/add", tooltip: "Add a new category"}
          ]
        },
        { section: 'Admin',
          routes: [
            {title: "View Administrators", icon:"supervisor_account", cols: 1, rows: 1, route: "admin/users", tooltip: "View, edit, or delete a administrator"},
            {title: "Add Administrators",  icon: "person_add", cols: 1, rows: 1, route: "admin/users/add", tooltip: "Add a new administrator"},
          ]
        }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private sanitizer: DomSanitizer) {}
}
