import {
  Component,
  OnInit
} from '@angular/core';
import {SearchForm} from "../../forms/search-form";
import {Resource} from "../../models/resource";
import {ResourceCategory} from "../../models/resource_category";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  title = 'Place Matters Maine';
  searchForm: SearchForm
  resources: Array<Resource>
  categories: Array<ResourceCategory>
  mapOpen = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resourceService: ResourceService) {
    this.searchForm = new SearchForm();
  }

  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.resources = this.activatedRoute.snapshot.data.resources;
  }



  //Load hidden main (when screen size is smaller than md device)
  toggleMap(): void {
    this.mapOpen = !this.mapOpen
  }

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
    })
  }

  resetSearchForm(): void {
    this.searchForm.reset()
    this.resourceService.getAllResources().subscribe((data) => {
      this.resources = data.resources;
    })
  }
}
