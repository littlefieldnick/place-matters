import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {AuthService} from "./services/auth.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Place Matters';
  userLoggedIn: boolean;
  constructor(private authService: AuthService,
              private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon(
        'person',
        sanitizer.bypassSecurityTrustResourceUrl('assets/static/imgs/person-24px.svg'));
  }
}
