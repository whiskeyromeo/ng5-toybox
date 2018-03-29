import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Routes Go here
const routes: Routes = [
    { path: 'ui', loadChildren: './ui-demo/ui-demo.module#UiDemoModule' },
    { path: 'd3', loadChildren: './d3-demo/d3-demo.module#D3DemoModule' },
    { path: '', loadChildren: './landing/landing.module#LandingModule' },
    { path: '**', redirectTo: 'ui' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

