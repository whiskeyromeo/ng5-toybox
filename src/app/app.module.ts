import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app.routing.module';
import { MaterialModule } from './modules/material.module';
// Components go here
import { AppComponent } from './app.component';

// local/config goes here
import { environment } from '../environments/environment';
import 'hammerjs';
import { RoutingService } from './services/routing.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
  ],
  providers: [
    RoutingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
