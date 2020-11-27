import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../../../services/resource.service";
import {Observable} from "rxjs";
import {Resource} from "../../../../models/resource";

@Component({
  selector: 'resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "category", "description", "street", "city",
    "state", "zipcode", "county", "website", "action"];
  dataSource: Resource[];

  constructor(private resourceService: ResourceService) {
    this.resourceService.getResources().subscribe((resources) => {
      console.log(resources);
      this.dataSource = resources["data"];
    })
  }

  ngOnInit(): void {

  }

}
