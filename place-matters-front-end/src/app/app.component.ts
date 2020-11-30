import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {AuthService} from "./services/auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Place Matters';
  icon: string;
  authenticated = false
  adminNav = ["View Map", "Edit/View Resources", "Add Resource", "Upload Resources",
    "Edit/View Categories", "Add Categories", "View/Edit Users", "Add a User"]

  constructor(public authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(){
    this.checkAuthentication();
  }

  checkAuthentication(){
    this.authService.isAuthenticated().subscribe((auth) => {
      this.authenticated = auth["success"];
      console.log(auth);
      if(this.authenticated)
        this.icon = "logout";
      else
        this.icon = "person"
    })
  }
}
