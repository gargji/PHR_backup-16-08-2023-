import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAnAppointmentComponent } from './schedule-an-appointment.component';

describe('ScheduleAnAppointmentComponent', () => {
  let component: ScheduleAnAppointmentComponent;
  let fixture: ComponentFixture<ScheduleAnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAnAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
