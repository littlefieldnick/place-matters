import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  selected: number; //Selected tab to be opened. Passed as a routing parameter.

  tabMappings = {
    "resources": 0,
    "categories": 1,
    "users": 2
  }

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let tabId = this.activatedRoute.snapshot.paramMap.get("tabName")
    if(tabId)
      this.selected = this.tabMappings[tabId];
    else
      this.selected = 0;
  }

}
