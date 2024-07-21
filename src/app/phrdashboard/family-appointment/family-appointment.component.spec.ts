import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAppointmentComponent } from './family-appointment.component';

describe('FamilyAppointmentComponent', () => {
  let component: FamilyAppointmentComponent;
  let fixture: ComponentFixture<FamilyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
