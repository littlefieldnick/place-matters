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
  loginIcon: string;
  userLoggedIn: boolean;
  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(){
    this.loginIcon = "person";
  }
}
