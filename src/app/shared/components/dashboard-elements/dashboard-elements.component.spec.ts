import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardElementsComponent } from './dashboard-elements.component';

describe('DashboardElementsComponent', () => {
  let component: DashboardElementsComponent;
  let fixture: ComponentFixture<DashboardElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
