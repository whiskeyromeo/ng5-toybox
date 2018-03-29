import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

import { SMALL_WIDTH_BREAKPOINT } from '../../ui-demo.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isOpen = false;
  links = ['Home', 'About', 'Works', 'Other'];
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(
    private router: Router,
    private zone: NgZone
  ) {

    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));

  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
  }
  
  getContent(link) {
    this.router.navigate(['/ui', link]);
    if (this.isScreenSmall()) {
      this.sidenav.close()
    }
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleSideBar() {
      this.isOpen = !this.isOpen
  }

}
