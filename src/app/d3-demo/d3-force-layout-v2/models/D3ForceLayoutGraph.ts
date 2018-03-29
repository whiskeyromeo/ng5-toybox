import * as d3 from 'd3';

export class D3ForceLayoutGraph {

    graphDiv: any;
    rect: any;
    width: any;
    height: any;
    center: any;
    svgId: any;

    graphData: any;
    graphLinksGroup: any;
    graphNodesGroup: any;
    simulation: any;
    svgGroup: any;


    constructor(graphDiv, svgId) {
        this.setProps(graphDiv);
        this.svgId = svgId;
    }

    setProps(graphDiv) {
        this.graphDiv = graphDiv;
        this.rect = graphDiv.getBoundingClientRect();
        this.width = this.graphDiv.scrollWidth;
        this.height = this.graphDiv.scrollHeight;
        this.center = { x: this.width / 2, y: this.height / 2};
    }

    init() {
        this.graphData = { "nodes": [], "links": [] };

        // graph area
        let svg = d3.select(this.graphDiv)
            .append("svg")
            .attr('id', this.svgId)
            .attr('width', this.width)
            .attr('height', this.height);

        // this should be second, after the svg
        let background = this.initBackground(svg);

        // the svgGroup should hold child components
        // such as nodes and links
        let svgGroup = svg.append('svg:g')
            .attr('id', "svgGroup");
        this.svgGroup = svgGroup;

        let graphLinksGroup = svgGroup
            .append("g")
            .attr("id", `links_${this.svgId}`)
            .attr("class", "links")
        this.graphLinksGroup = graphLinksGroup;

        let graphNodesGroup = svgGroup
            .append("g")
            .attr("id", `nodes_${this.svgId}`)
            .attr("class", "links");
        this.graphNodesGroup = graphNodesGroup;

        let zoom = d3.zoom()
            .on("zoom", () => this.handleZoom(svgGroup))
        background.call(zoom);

        let simulation = this.initSimulation();
        this.simulation = simulation;

        // update
        this.update(simulation, graphNodesGroup, graphLinksGroup)
    }

    initBackground(svg) {
        let result = svg
            .append("rect")
            .attr("id", "backgroundId")
            .attr("fill", "#F2F7F0")
            .attr("class", "view")
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", this.width - 1)
            .attr("height", this.height - 1)
            .on("click", () => this.handleBackgroundClicked());

        return result;
    }

    getColor(d) {
        return "lightblue";
    }

    getRadius(d) {
        const min = 5;
        const max = 50;
        let r = Math.trunc(500 / (d.id || 1));
        if (r < min) r = min;
        if (r > max) r = max;

        return r;
    }

    handleBackgroundClicked() {
        console.log('background clicked');
    }

    handleDragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    handleDragEnded(d, simulation) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = undefined;
        d.fy = undefined;
    }

    handleDragStarted(d, simulation) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    handleEnd() {
        console.log('simulation ended');
    }

    handleNodeClicked(d) {
        console.log(`node clicked: ${JSON.stringify(d)}`);

        let newId = Math.trunc(Math.random() * 1000);
        let newNode = { "id": newId, "name": "server 22", x: d.x, y: d.y };
        let newNodes = [newNode];
        let newLinks = [{ source: d.id, target: newNode.id }];

        this.add(newNodes, newLinks);
    }

    handleZoom(svgGroup) {
        svgGroup
            .attr("transform",
                `translate(${d3.event.transform.x}, ${d3.event.transform.y})` + " "
                + `scale(${d3.event.transform.k})`
            );
    }

    initSimulation() {
        let result = d3.forceSimulation()
            .velocityDecay(0.55)
            .force("link",
                d3.forceLink()
                    .distance(100)
                    .id(d => d['id'])
            )
            .force("charge",
                d3.forceManyBody()
                    .strength(-100)
                    .distanceMin(1000)
            )
            .force("collide", d3.forceCollide(25))
            .force("center", d3.forceCenter(this.center.x, this.center.y));

        return result;
    }

    update(simulation, graphNodes, graphLinks) {
        let nodes = this.graphData.nodes;
        let links = this.graphData.links;

        let drag = d3.drag()
            .on("start", d => this.handleDragStarted(d, simulation))
            .on("drag", d => this.handleDragged(d))
            .on("end", d => this.handleDragEnded(d, simulation));

        // nodes
        let graphNodesData = graphNodes
            .selectAll("g")
            .data(nodes, d => d.id);

        let graphNodesEnter = graphNodesData
            .enter()
            .append("g")
            .attr("id", d => d.id || null)
            .on("contextmenu", (d, i) => {
                this.remove(d);
                d3.event.preventDefault();
            })
            .on("mouseover", (d) => {    
                this.createTooltip(d);
            })
            .on("mouseout", (d) => {
                d3.select('#tooltip').remove();
            })
            .on("click", d => this.handleNodeClicked(d))
            .call(drag);

        let graphNodesExit = graphNodesData
            .exit()
            .remove();

        let graphNodesCircles = graphNodesEnter
            .append("circle")
            .classed('node', true)
            .attr("cursor", "pointer")
            .attr("r", d => this.getRadius(d))
            .attr("fill", d => this.getColor(d));

        let graphNodeLabels = graphNodesEnter
            .append("text")
            .attr("id", d => "label_" + d.id)
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .text(d => `${d.id}`);

        // merge nodes
        graphNodesData = graphNodesEnter.merge(graphNodesData)

        // links
        let graphLinksData = graphLinks
            .selectAll("line")
            .data(links);

        let graphLinksEnter = graphLinksData
            .enter()
            .append("line")
            .attr("stroke", d => this.getColor(d));

        let graphLinksExit = graphLinksData
            .exit()
            .remove();

        // merge links
        graphLinksData = graphLinksEnter.merge(graphLinksData);

        simulation.nodes(nodes)
            .on("tick", handleTicked)
            .on("end", () => this.handleEnd());

        simulation
            .force("link")
            .links(links);

        function handleTicked() {
            graphLinksData
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            // translate the groups
            graphNodesData
                .attr("transform", d => {
                    return 'translate(' + [d.x, d.y] + ')';
                });
        }
    }

    createTooltip(data) {
        // expecting {id: 0, name: "root node", index: 0, x: 513.2453439870249, y: 339.1303763014873, …}
        d3.select(`#${this.svgId}`)
            .append("text")
            .text(`this is ${data.name}`)
            .attr("x", data.x)
            .attr("y", data.y)
            .attr("id", "tooltip")
            .enter()
        
    }

    add(nodesToAdd, linksToAdd) {
        if (nodesToAdd) {
            nodesToAdd.forEach(n => this.graphData.nodes.push(n));
        }

        if (linksToAdd) {
            linksToAdd.forEach(l => this.graphData.links.push(l));
        }

        //update
        this.update(this.simulation, this.graphNodesGroup, this.graphLinksGroup);
        this.simulation.restart();
        this.simulation.alpha(1);
    }

    remove(dToRemove) {
        console.log(`dToRemove: ${JSON.stringify(dToRemove)}`);
        let currentNodes = this.graphData.nodes;
        let currentLinks = this.graphData.links;
        let nIndex = currentNodes.indexOf(dToRemove);
        if (nIndex > -1) {
            currentNodes.splice(nIndex, 1);
        }

        let toRemoveLinks = currentLinks.filter(l => {
            return l.source.id === dToRemove.id || l.target.id === dToRemove.id;
        });

        toRemoveLinks.forEach(l => {
            let lIndex = currentLinks.indexOf(l);
            currentLinks.splice(lIndex, 1);
        });

        this.update(this.simulation, this.graphNodesGroup, this.graphLinksGroup);
        this.simulation.restart();
        this.simulation.alpha(1);
    }



}