import {
  Component,
  ChangeDetectorRef,
  HostListener,
  Input,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { ForceDirectedGraph } from '../../models/force-directed-graph';
import { Node } from '../../models/node';
import { D3GraphService } from '../../services/d3-graph.service';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link"*ngFor="let link of links"></g>
        <g [nodeVisual]="node"
          *ngFor="let node of nodes"
          [draggableNode]="node" 
          [draggableInGraph]="graph"
        ></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @Input('nodes') nodes;
  @Input('links') links;

  graph: ForceDirectedGraph;

  constructor(
    private d3GraphService: D3GraphService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // receive the initialized simulated graph from the d3 graph service
    this.graph = this.d3GraphService.getForceDirectedGraph(this.nodes, this.links, this.options);
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);

    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  private _options: { width, height } = { width : 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

}
