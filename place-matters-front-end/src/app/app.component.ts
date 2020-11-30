import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Place Matters Maine';
  icon: string;
  authenticated = false
  adminNav = ["View Map", "Edit/View Resources", "Add Resource", "Upload Resources",
    "Edit/View Categories", "Add Categories", "View/Edit Users", "Add a User"]

  constructor(public authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(){

  }

  isAuthenticated(){
    return localStorage.getItem("loggedInUser");
  }
}
