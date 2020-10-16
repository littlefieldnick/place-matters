import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  constructor(private sanitizer: DomSanitizer, iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon(
        'person',
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/person-24px.svg'));
  }
}
