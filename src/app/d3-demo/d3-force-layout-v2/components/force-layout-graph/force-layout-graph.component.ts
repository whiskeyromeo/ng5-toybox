import { 
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Location } from '@angular/common';

import { D3ForceLayoutGraph } from '../../models/D3ForceLayoutGraph';

import * as d3 from 'd3';

@Component({
  selector: 'app-force-layout-graph',
  templateUrl: './force-layout-graph.component.html',
  styleUrls: ['./force-layout-graph.component.scss']
})
export class ForceLayoutGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('d3GraphDiv') svgContainer;
  
  graph: D3ForceLayoutGraph;
  nodeForm: FormGroup;

  constructor(private location: Location) {
    
  }

  ngOnInit() {
    this.graph = new D3ForceLayoutGraph(this.svgContainer.nativeElement, "testSvgId");
    this.graph.init();
    this.nodeForm = new FormGroup({
      baseCount: new FormControl('', Validators.required),
      stopCount: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit() {
    this.populateGraph(1, 4);
  }

  addNode() {
    let baseCount = +this.nodeForm.value.baseCount;
    let stopCount = +this.nodeForm.value.stopCount;
    this.populateGraph(baseCount, stopCount);
  }


  populateGraph(initialCount, endCount) {
    let nodes = [{ "id": 0, "name": "root node" }];
    let links = [];
    // Set up the nodes here, starting with the initial count
    for (let i = 1; i < initialCount; i++) {
      let randomIndex = Math.trunc(Math.random() * nodes.length);
      let randomNode = nodes[randomIndex];
      let newNode = { id: i, name: `node ${i}` };
      let newLink = { source: randomIndex, target: newNode.id };

      nodes.push(newNode);
      links.push(newLink);
    }

    // Add the nodes
    console.log(nodes);
    this.graph.add(nodes, links);
    let count = 0;
    // We will generate nodes with a new set of nodes being generated at every interval
    // this will cause an exponential increase in the node count
    let interval = setInterval(() => {
      let randomIndex = Math.trunc(Math.random() * this.graph.graphData.nodes.length);
      let randomNode = this.graph.graphData.nodes[randomIndex];
      let randomId = Math.trunc(Math.random() * 10000);
      let newNode = { "id": randomId, "name": "server " + randomId };
      if (randomNode.x) {
        newNode["x"] = randomNode.x;
        newNode["y"] = randomNode.y;
      }

      let newLink = { source: randomNode.id, target: randomId };
      this.graph.add([newNode], [newLink]);
      count++;
      if (count % endCount === 0) {
        clearInterval(interval);
      }
    }, 10);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('window resize');
  }


}
