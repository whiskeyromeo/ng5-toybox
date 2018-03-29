
import { ForceLayoutGraphComponent } from './d3-force-layout-v2/components/force-layout-graph/force-layout-graph.component';
import { D3ScatterComponentV1 } from './d3-scatter-v1/d3-scatter-v1.component';
// import { RoutingService } from '../services/routing.service';
import { D3BaseComponent } from './d3-base/d3-base.component';

const ROUTE_CONFIG = [
    {
        name: 'Home',
        path: './',
        redirectTo: 'home'
    },
    {
        path:'home',
        component: D3BaseComponent
    },
    {
        name: 'Scatter',
        path: 'scatter',
        component: D3ScatterComponentV1
    },
    {
        name: 'Force Graph 2',
        path: 'graph-v2',
        component: ForceLayoutGraphComponent
    },
]

const prod_schema = [
    {path: './', redirectTo: 'home'},
    {path: 'home', component: D3BaseComponent},
    {path: 'scatter', component: D3ScatterComponentV1},
    {path: 'graph-v2', component: ForceLayoutGraphComponent}    
]

const prod_names = [
    {name: 'Home', redirectTo: 'home'},
    {name: 'Scatter', path: 'scatter'},
    {name: 'Force Graph 2', path: 'graph-v2'},
]

// const d3RoutingService = new RoutingService(ROUTE_CONFIG, 'd3');
// export const ROUTE_SCHEMA = d3RoutingService.getRoutingSchema();
// export const NAMED_ROUTES = d3RoutingService.getNamedRoutes();
export const ROUTE_SCHEMA = prod_schema;
export const NAMED_ROUTES = prod_names;


