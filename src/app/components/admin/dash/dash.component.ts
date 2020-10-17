import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AppConfigService} from "../../../services/app-config.service";

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row **/
  columns: number;
  rowHeight: number
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if(matches){
        this.columns = 2;
        this.rowHeight = 200;
        return this.appConfigService.dashLayout["mobile"];
      }

      this.rowHeight = 300;
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
