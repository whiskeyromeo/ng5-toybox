import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// Resources Below
import { routes } from './ui-demo.routes';
// Components Below
import { UiDemoAppComponent } from './ui-demo-app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BaseComponent } from './components/base/base.component';


@NgModule({
  declarations: [
    UiDemoAppComponent,
    SidebarComponent,
    BaseComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  providers: [
  ],
  entryComponents: [
  ],
})

export class UiDemoModule { }
