import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import { Resource } from "../../models/resource";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.scss']
})
export class ResourceInfoComponent implements OnInit {
  id: number
  resource: Resource;
  constructor(private route: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resource = this.route.snapshot.data.id;
    console.log(this.resource)
  }
}
