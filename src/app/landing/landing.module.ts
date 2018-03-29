import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { MaterialModule } from '../modules/material.module';
import { RouterModule } from '@angular/router';
import { routes } from './landing.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
