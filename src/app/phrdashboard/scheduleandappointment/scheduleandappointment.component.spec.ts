import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleandappointmentComponent } from './scheduleandappointment.component';

describe('ScheduleandappointmentComponent', () => {
  let component: ScheduleandappointmentComponent;
  let fixture: ComponentFixture<ScheduleandappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleandappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleandappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
