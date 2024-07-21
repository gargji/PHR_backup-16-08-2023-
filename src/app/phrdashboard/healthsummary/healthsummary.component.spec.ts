import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthsummaryComponent } from './healthsummary.component';

describe('HealthsummaryComponent', () => {
  let component: HealthsummaryComponent;
  let fixture: ComponentFixture<HealthsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
