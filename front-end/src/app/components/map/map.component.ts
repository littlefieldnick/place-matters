import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {SearchForm} from "../../forms/search-form";
import {Resource} from "../../models/resource";
import {ResourceCategory} from "../../models/resource_category";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {
  // Google Map Parameters
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap
  @ViewChildren(MapInfoWindow) infoWindows: QueryList<MapInfoWindow>
  @ViewChild('mapDisplay') mapDisplay: ElementRef;

  center: google.maps.LatLngLiteral;
  currentInfoMarker: MapInfoWindow;
  mapMarkers: Array<any> = []
  zoom = 15;
  width: number;
  height: number;
  mapOpen = true;

  title = 'Place Matters Maine';
  searchForm: SearchForm
  resources: Array<Resource>
  categories: Array<ResourceCategory>

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private resourceService: ResourceService) {
    this.searchForm = new SearchForm();
  }

  ngAfterViewInit():void {

    setTimeout(() => {
      this.width = this.mapDisplay.nativeElement.innerWidth - 175;
      this.height = this.mapDisplay.nativeElement.innerHeight;
    });
  }

  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.resources = this.activatedRoute.snapshot.data.resources;
    this.mapOpen=false;
    // Load map markers and set map center to the location of the first resource
    this.loadMarkersAndCenter();
  }

  loadMarkersAndCenter(): void {
    for (let re in this.resources) {
      let marker = {
        position: {
          lat: this.resources[re].latitude,
          lng: this.resources[re].longitude
        },

        title: this.resources[re].name,

        markerInfo: {
          id: this.resources[re].id,
          name: this.resources[re].name,
          address: this.resources[re].address,
          category: this.resources[re].category["name"]
        }
      }

      this.mapMarkers.push(marker)
    }

    this.createMapCenter();
  }

  userClosed(): void {
    this.currentInfoMarker = undefined;
  }

  openInfoMarker(mapMarker: MapMarker, markerIndex): void {
    let curIdx = 0;

    //Close current open info window
    if (this.currentInfoMarker != undefined)
      this.currentInfoMarker.close()

    this.infoWindows.forEach((window) => {
      if (curIdx == markerIndex) {
        window.open(mapMarker)
        this.currentInfoMarker = window
      }

      curIdx++
    });
  }

  //Load hidden map (when screen size is smaller than md device)
  toggleMap(): void {
    this.mapOpen = !this.mapOpen
    setTimeout(() => {
      this.width = this.mapDisplay.nativeElement.offsetWidth;
      this.height = this.mapDisplay.nativeElement.offsetHeight;
    }, 3000)



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

  resizeMap(size):void {
    this.height = size.height;
    this.width = size.width;

    console.log(this.height);
    console.log(this.width);
  }

  createMapCenter(): void {
    let latCenter = 0.0;
    let lngCenter = 0.0

    this.mapMarkers.forEach((loc) => {
      latCenter += loc.position.lat;
      lngCenter += loc.position.lng;
    })

    this.center = {
      lat: latCenter/this.mapMarkers.length,
      lng: lngCenter/this.mapMarkers.length
    };
  }
}
