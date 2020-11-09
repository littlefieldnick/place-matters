import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Resource} from "../../models/resource";

@Component({
  selector: 'map-display',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
   // Google Map Parameters
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap
  @ViewChildren(MapInfoWindow) infoWindows: QueryList<MapInfoWindow>
  @ViewChildren(MapMarker) mapMarkersList: QueryList<MapMarker>
  @ViewChild('mapDisplay') mapDisplay: ElementRef;
  center: google.maps.LatLngLiteral;
  currentInfoMarker: MapInfoWindow;
  mapMarkers: Array<any> = []
  zoom = 8;


  @Input()
  resources: Array<Resource>;
  height: string;
  width: string;

  constructor() { }

  ngAfterViewInit():void {
    setTimeout(() => {
      if(this.mapDisplay.nativeElement.offsetWidth != 0)
        this.width = this.mapDisplay.nativeElement.offsetWidth;
      if(this.mapDisplay.nativeElement.offsetHeight != 0)
        this.height = this.mapDisplay.nativeElement.offsetHeight;
    });
  }

  ngOnInit(): void {
    this.loadMarkersAndCenter();
  }

  resizeMap(size):void {
    this.height = size.height + 'px';
    this.width = size.width + 'px';
  }

  createMapCenter(): void {
    let latCenter = 0.0;
    let lngCenter = 0.0

    this.mapMarkers.forEach((loc) => {
      latCenter += Number(loc.position.lat);
      lngCenter += Number(loc.position.lng);
    })

    this.center = {
      lat: latCenter/this.mapMarkers.length,
      lng: lngCenter/this.mapMarkers.length
    };
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
          address: this.resources[re].street + ", " +  this.resources[re].city+ ", " + this.resources[re].state + ", "
              + this.resources[re]["zipcode"],
          category: this.resources[re].categoryName
        }
      }

      this.mapMarkers.push(marker)
    }

    this.createMapCenter();
  }

  userClosed(): void {
    this.currentInfoMarker = undefined;
  }

  findCorrectMapMarker(idx){
    let curIdx = 0;
    let foundMarker = undefined;
    this.mapMarkersList.forEach((marker) => {
      if (idx == curIdx){
         foundMarker = marker;
      }

      curIdx++;
    });

    return foundMarker;
  }

  openInfoMarker(markerIndex, mapMarker?: MapMarker): void {
    let curIdx = 0;
    if(!mapMarker){
      mapMarker = this.findCorrectMapMarker(markerIndex);
    }

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
}
