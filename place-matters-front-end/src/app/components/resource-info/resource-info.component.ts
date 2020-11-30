import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import { Resource } from "../../models/resource";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.scss']
})

export class ResourceInfoComponent implements OnInit {
  icon: string = "close"
  @Input()
  resource: Resource;

  @Output()
  closeInfo = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }
}
