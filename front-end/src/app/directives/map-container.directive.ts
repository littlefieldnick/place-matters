import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {DeviceSize} from "../models/devices";
import {D} from "@angular/cdk/keycodes";

@Directive({
  selector: '[mapContainer]',
   host: {
    '(window:resize)': 'onResize()'
    }
})

export class MapContainerDirective {
  @Output()
  mapSizeChanged: EventEmitter<any> = new EventEmitter<number>()

  constructor(private elementRef: ElementRef) {
    this.onResize();
  }

  onResize(){
    this.mapSizeChanged.emit({
        width: this.elementRef.nativeElement.offsetWidth,
        height: this.elementRef.nativeElement.offsetHeight
    });
  }
}
