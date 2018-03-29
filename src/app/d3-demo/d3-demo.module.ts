import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../modules/material.module';

import { D3Service } from 'd3-ng2-service';
import { D3BaseComponent } from './d3-base/d3-base.component';
import { D3ScatterComponentV1} from './d3-scatter-v1/d3-scatter-v1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForceLayoutGraphComponent } from './d3-force-layout-v2/components/force-layout-graph/force-layout-graph.component';

import { ROUTE_SCHEMA } from './d3-route.config';
import { NavigationComponent } from './navigation/navigation.component';
import { RoutingService } from '../services/routing.service';

const routes : Routes = [{path: '', component: NavigationComponent, children: ROUTE_SCHEMA}];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    D3Service
  ],
  declarations: [
    D3ScatterComponentV1,
    D3BaseComponent,
    ForceLayoutGraphComponent,
    NavigationComponent,
  ],
  bootstrap: [D3BaseComponent]
})
export class D3DemoModule { }
