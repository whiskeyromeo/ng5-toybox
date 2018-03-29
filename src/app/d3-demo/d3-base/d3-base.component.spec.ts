import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3BaseComponent } from './d3-base.component';

describe('D3BaseComponent', () => {
  let component: D3BaseComponent;
  let fixture: ComponentFixture<D3BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3BaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
