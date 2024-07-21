import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrvitalsComponent } from './phrvitals.component';

describe('PhrvitalsComponent', () => {
  let component: PhrvitalsComponent;
  let fixture: ComponentFixture<PhrvitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhrvitalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhrvitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
