
// Implement SimulationNodeDatum interface into the custom Node class
export class Node implements d3.SimulationNodeDatum {

    // define optional implementation properties
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    
    fill: string;
    id: string;
    linkCount: number = 0;

    constructor(id, fill="blue") {
        this.id = id;
        this.fill = fill;
    }

}