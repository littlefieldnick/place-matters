import {
  Directive,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

@Directive({
  selector: '[mapContainer]',
  host: {
    '(window:resize)': 'this.resize()'
  }
})

export class MapContainerDirective {
  @Output()
  mapSizeChanged: EventEmitter<any> = new EventEmitter<number>()

  constructor(private elementRef: ElementRef) {
    this.resize()
  }

  resize(){
    this.mapSizeChanged.emit({
        width: this.elementRef.nativeElement.offsetWidth,
        height: this.elementRef.nativeElement.offsetHeight
    });
  }
}
