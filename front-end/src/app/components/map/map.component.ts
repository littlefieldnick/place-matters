import {Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SearchForm} from "../../forms/search-form";
import {Resource} from "../../models/resource";
import {ResourceCategory} from "../../models/resource_category";
import {ActivatedRoute} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // Google Map Parameters
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChildren(MapInfoWindow) infoWindows: QueryList<MapInfoWindow>
  center: google.maps.LatLngLiteral;
  currentInfoMarker: MapInfoWindow;
  mapMarkers: Array<any> = []
  zoom = 15;
  width="950"
  height="650"
  mapOpen = false;

  title = 'Place Matters Maine';
  searchForm: SearchForm
  resources: Array<Resource>
  categories: Array<ResourceCategory>

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private resourceService: ResourceService) {
    this.searchForm = new SearchForm()
  }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories;
    this.resources = this.route.snapshot.data.resources;

    //Set map center to the location of the first resource
    this.center = {
      lat: this.resources[0].latitude,
      lng: this.resources[0].longitude
    }

    this.loadMarkers();
  }

  loadMarkers() {
    for (let re in this.resources) {
      let marker = {
        position: {
          lat: this.resources[re].latitude,
          lng: this.resources[re].longitude
        },

        title: this.resources[re].name,

        markerInfo: {
          name: this.resources[re].name,
          address: this.resources[re].address,
          category: this.resources[re].category["name"]
        }
      }

      this.mapMarkers.push(marker)
    }
  }

  userClosed(){
    this.currentInfoMarker = undefined;
  }

  openInfoMarker(mapMarker: MapMarker, markerIndex){
    let curIdx = 0;

    //Close current open info window
    if(this.currentInfoMarker != undefined)
      this.currentInfoMarker.close()

    this.infoWindows.forEach((window) => {
      if (curIdx == markerIndex){
        window.open(mapMarker)
        this.currentInfoMarker = window
      }

      curIdx++
    });
  }

  //Load hidden map (when screen size is smaller than md device)
  toggleMap()
  {
    this.mapOpen = !this.mapOpen
  }

  search()
  {
    let category = this.searchForm.get("category").value;
    let resourceName = this.searchForm.get("name").value;
    if (category.length == 0) {
      category = ''
    }

    if (resourceName.length == null) {
      resourceName = ''
    }

    //TODO: Implement Search functionality
  }

  resetSearchForm()
  {
    this.searchForm.reset()

    this.resourceService.getAllResources().subscribe((data) => {
      this.resources = data.resources;
    })

    console.log(this.resources)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    console.log("Resize event fired!")
    if (this.mapOpen) {
      this.mapOpen = false;
    }
  }
}
