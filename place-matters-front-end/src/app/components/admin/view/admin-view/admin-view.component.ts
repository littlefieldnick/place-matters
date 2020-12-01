import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  displayedColumns: string[] = ["id",  "email"];
  dataSource = this.authService.getUser();
  user;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  setUser(user){
    console.log(user);
    this.user = user;
  }

}
