import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  displayedColumns: string[] = ["id", "firstName", "lastName", "email", "action"];
  dataSource = this.authService.getAllUsers();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
