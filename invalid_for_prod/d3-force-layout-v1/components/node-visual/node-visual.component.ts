import { Component, Input } from '@angular/core';

import { Node } from '../../models/node';

import CONFIG from '../../d3.config';


@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node"
          cx="0"
          cy="0"
          opacity="0.8"
          id="node_{{node.id}}"
          [attr.fill]="node.fill"
          [attr.r]=50
          >
      </svg:circle>
      <svg:text
        class="node-name"
      >
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  fill = CONFIG.SPECTRUM[Math.floor(Math.random() * CONFIG.SPECTRUM.length)];
}
