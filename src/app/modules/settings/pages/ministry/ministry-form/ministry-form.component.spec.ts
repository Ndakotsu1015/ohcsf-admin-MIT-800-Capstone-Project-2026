import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryFormComponent } from './ministry-form.component';

describe('MinistryFormComponent', () => {
  let component: MinistryFormComponent;
  let fixture: ComponentFixture<MinistryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
