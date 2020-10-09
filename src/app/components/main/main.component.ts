import {
  AfterViewInit,
  Component,
  OnInit, Output, ViewChild
} from '@angular/core';
import {SearchForm} from "../../forms/search.form";
import {Resource} from "../../models/resource";
import {ResourceCategory} from "../../models/resource_category";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit{
  title = 'Place Matters Maine';
  searchForm: SearchForm
  resources: Array<Resource>
  categories: Array<ResourceCategory>
  mapOpen: boolean = true;

  //Needed to communicate with the map and open info markers
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private resourceService: ResourceService) {
    this.searchForm = new SearchForm();
  }

  //Get the page data loaded by the resolver
  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.resources = this.activatedRoute.snapshot.data.resources;
  }

  //Load hidden main (when screen size is smaller than md device)
  toggleMap(): void {
    this.mapOpen = !this.mapOpen
  }

  //Search for a resource based on category and/or name
  search(): void {
    let category = this.searchForm.get("category").value;
    let resourceName = this.searchForm.get("name").value;
    if (category.length == 0) {
      category = ''
    }

    if (resourceName.length == null) {
      resourceName = ''
    }

    this.resourceService.searchResources(resourceName, category).subscribe((data: Resource[]) => {
      this.resources = data["results"];
    });
  }

  //Clear the search form
  resetSearchForm(): void {
    this.searchForm.reset()
    this.resourceService.getAllResources().subscribe((data) => {
      this.resources = data.resources;
    })
  }

  //Open an info box located on the map
  openInfoBox(idxToOpen){
    this.mapComponent.openInfoMarker(idxToOpen);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapOpen = false;

      //Check device size, if smaller than a certain size, set mapOpen to true to
      //render map, then set to false to hide it
    });
  }
}
