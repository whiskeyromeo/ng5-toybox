import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
    // Optional - defining optional implementation properties - required for relevant typings
    index? :number;

    // Must - define enforces implementation properties
    source: Node | string | number;
    target: Node | string | number;

    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}