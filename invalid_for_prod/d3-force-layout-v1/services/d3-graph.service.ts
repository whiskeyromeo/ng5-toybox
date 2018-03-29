import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import { ForceDirectedGraph } from '../models/force-directed-graph';
import { Node } from '../models/node';
import { Link } from '../models/link';


@Injectable()
export class D3GraphService {
  /**
   * The objective of this service is to provide methods to enable interaction with elements 
   * while maintaining the d3 simulation physics
   */
  constructor() { }

  // Method to bind a pan and zoom behavior to an svg element
  applyZoomableBehavior(svgElement, containerElement) {
    let svg, container, zoomed, zoom;
    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      container.attr("transform", `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
    }
    zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
  }

  // Method to bind a draggable behavior to an svg element
  applyDraggableBehavior(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);
    
    function started() {
      /** Prevent propagation of drag start to the parent element */
      d3.event.sourceEvent.stopPropagation();

      if(!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on("drag", dragged).on("end", ended);
    
      // Get the point from which the drag began
      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        // Stop the drag, reset the points
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag().on("start", started));

  }

  // perform calculations with d3 to generate a force directed graph
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {width, height}) {
    let graph = new ForceDirectedGraph(nodes, links, options);
    return graph;
  }

}
