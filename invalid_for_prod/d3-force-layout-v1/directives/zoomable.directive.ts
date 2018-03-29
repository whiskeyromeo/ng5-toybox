import { Directive, Input, ElementRef } from '@angular/core';
import { D3GraphService } from '../services/d3-graph.service';

@Directive({
  selector: '[zoomableOf]'
})
export class ZoomableDirective {
  @Input('zoomableOf') zoomableOf: ElementRef;

  constructor(private d3GraphService: D3GraphService, private _element: ElementRef) { }

  ngOnInit() {
    this.d3GraphService.applyZoomableBehavior(this.zoomableOf, this._element.nativeElement);
  }
  
}
