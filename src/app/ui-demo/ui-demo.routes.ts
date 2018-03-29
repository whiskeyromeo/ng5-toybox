import { Routes } from '@angular/router';

import { UiDemoAppComponent } from './ui-demo-app.component';
import { BaseComponent } from './components/base/base.component';

export const routes: Routes = [
    {path: '', component: UiDemoAppComponent,
        children: [
            { path: ':link', component: BaseComponent},
        ]
    },
    {path: '**', redirectTo: ''}
];


