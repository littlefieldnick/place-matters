import {Component, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AppConfigService} from "../../../services/app-config.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row **/
  columns: number = 4;
  rowHeight: number = 200
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if(matches){
        this.columns = 2;
        return this.appConfigService.dashLayout["mobile"];
      }

      this.columns = 4;
      return this.appConfigService.dashLayout["main"];
    })
  );

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,
              private sanitizer: DomSanitizer, private appConfigService: AppConfigService) {}

  navigate(url){
    this.router.navigate([url]);
  }

}
