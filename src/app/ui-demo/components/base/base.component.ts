import { Component, OnInit } from '@angular/core';
import { DATA } from './base.info';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  dogs = DATA;

  constructor() { }

  ngOnInit() {
  }

}
