import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../../../services/resource.service";
import {Observable} from "rxjs";

@Component({
  selector: 'resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "category", "description", "address", "website"];
  dataSource = this.resourceService.getResources();

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {

  }

}
