import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NAMED_ROUTES } from '../d3-route.config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  links = NAMED_ROUTES;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.links);
  }

  getContent(link) {
    console.log(link);
    this.router.navigate(['/d3', link.path]);
  }

}
