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
import {County} from "../../models/county";

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
  counties: Array<County>;
  mapOpen: boolean = true;
  searchError = '';

  resourceOpen = false;
  resourceInfoSelection;

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
    this.counties = this.activatedRoute.snapshot.data.counties["data"];
    this.resources = this.activatedRoute.snapshot.data.resources.data;
    console.log(this.counties);
  }

  //Load hidden main (when screen size is smaller than md device)
  toggleMap(): void {
    this.mapOpen = !this.mapOpen
  }

  openResourceInfo(resource){
    this.resourceInfoSelection = resource;
    this.resourceOpen=true;
  }

  closeResourceInfo(){
    this.resourceOpen=false;
    this.resourceInfoSelection=-1;
  }

  //Search for a resource based on category and/or name
  search(): void {
    this.searchError = '';
    let category = this.searchForm.get("category").value;
    let resourceName = this.searchForm.get("name").value;
    let countyName = this.searchForm.get("county").value;
    let emptyField = 0;

    if (!category) {
      category = ''
      emptyField += 1;
    }

    if (resourceName.length == 0) {
      emptyField += 1;
    }

    if(!countyName){
      countyName = ''
      emptyField += 1;
    }

    if(emptyField == 3) {
      console.log(emptyField);
      this.searchError = "Search Error: At least one search field is required."
      return;
    }

    this.resources = this.resources.filter((re) => {
      if(category.length > 0 && resourceName.length > 0 && countyName.length > 0) {
        return re.category.categoryName == category
            && re.name.startsWith(resourceName)
            && re.county.countyName.startsWith(countyName);
      } else if(category.length >0 && countyName.length >0) {
        return re.category.categoryName == category
            && re.county.countyName.startsWith(countyName);
      } else if(resourceName.length > 0 && countyName.length > 0){
        return re.name.startsWith(resourceName) && re.county.countyName.startsWith(countyName);
      } else if(category.length > 0){
        return re.category.categoryName == category;
      } else if(resourceName.length > 0) {
        return re.name.startsWith(resourceName);
      } else if(countyName.length > 0) {
        return re.county.countyName.startsWith(countyName);
      }
    });
  }

  resetResources(event?){
    this.resourceService.getResources().subscribe((data) => {
      this.resources = data["data"];
    })
  }

  //Clear the search form
  resetSearchForm(): void {
    this.searchForm.reset()
    this.resetResources()
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
