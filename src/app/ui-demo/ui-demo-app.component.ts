import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-demo-app',
  template: `
    <app-sidebar></app-sidebar>
  `,
  styleUrls: ['./ui-demo.styles.scss']
})
export class UiDemoAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
