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
        width: this.getWidth(),
        height: this.getHeight()
    });
  }

  getWidth(){
    if (this.elementRef.nativeElement.offsetWidth == 0)
      return window.outerWidth;

    return this.elementRef.nativeElement.offsetWidth
  }

   getHeight(){
    if (this.elementRef.nativeElement.offsetHeight== 0)
      return window.outerHeight * 0.75;


    return this.elementRef.nativeElement.offsetHeight
  }
}
