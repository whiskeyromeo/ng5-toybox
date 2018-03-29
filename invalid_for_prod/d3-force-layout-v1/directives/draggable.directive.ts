import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ForceDirectedGraph } from '../models/force-directed-graph';
import { Node } from '../models/node';
import { D3GraphService } from '../services/d3-graph.service';

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') draggableNode: Node;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor(private d3GraphService: D3GraphService, private _element: ElementRef) { }

  ngOnInit() {
    this.d3GraphService.applyDraggableBehavior(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
  }
}
