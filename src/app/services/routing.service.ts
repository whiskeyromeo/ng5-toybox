import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";

@Injectable()
export class RoutingService {
    routes : any[]
    basePath: string
    // constructor(config, basePath) { 
        // this.routes = config;
        // this.basePath = basePath;
    // }

    public getNamedRoutes() {
        let namedRoutes = this.routes.filter((route) => {
            if(route.name) {
                return { name: route.name, path: route.path}
            }
        });
        return namedRoutes;
    }

    public getRoutingSchema(redirect_target='home') {
        let targetRoutes : Routes = this.routes.map((route) => {
            let newRoute = Object.assign({}, route);
            if(newRoute.name) {
                delete newRoute.name;
            }
            return newRoute;
        });
        targetRoutes.push({path: '**', redirectTo: redirect_target });
        return targetRoutes;
    }

    
}