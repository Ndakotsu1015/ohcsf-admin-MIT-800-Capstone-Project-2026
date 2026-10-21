import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryListComponent } from './ministry-list.component';

describe('MinistryListComponent', () => {
  let component: MinistryListComponent;
  let fixture: ComponentFixture<MinistryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
