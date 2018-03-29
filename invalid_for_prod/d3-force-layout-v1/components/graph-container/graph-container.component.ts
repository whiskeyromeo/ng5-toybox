import { Component, OnInit } from '@angular/core';
import { Node } from '../../models/node';
import { Link } from '../../models/link';

import CONFIG from '../../d3.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit{
  nodes: Node[] = [];
  links: Link[] = [];

  nodeForm: FormGroup;

  constructor() {
    const N = CONFIG.N;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      let nodeColor = this.getRandomColor();
      this.nodes.push(new Node(i, nodeColor));
    }

    for (let i = 1; i <= N; i++) {
      this.addLinks(i);
    }
  }

  ngOnInit() {
    this.nodeForm = new FormGroup({
      nodeValue: new FormControl('', Validators.required)
    })
  }

  addLinks(index) {
    const getIndex = number => number - 1;
    for (let i = 2; index * i <= this.nodes.length; i++) {
      this.nodes[getIndex(index)].linkCount++;
      this.nodes[getIndex(index * i)].linkCount++;
      this.links.push(new Link(index, index * i));
    }
  }

  addNode() {
    // console.log(this.nodeForm.value);
    let nodeval = +this.nodeForm.value.nodeValue;
    console.log(typeof nodeval, nodeval);
    // this.nodes.push(new Node(nodeval, this.getRandomColor()));
    // this.addLinks(this.nodes.length-1);
  }

  getRandomColor() {
    return CONFIG.SPECTRUM[Math.floor(Math.random() * CONFIG.SPECTRUM.length)];
  }
}
