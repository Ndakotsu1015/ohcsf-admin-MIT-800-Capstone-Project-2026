import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryEditComponent } from './ministry-edit.component';

describe('MinistryEditComponent', () => {
  let component: MinistryEditComponent;
  let fixture: ComponentFixture<MinistryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
