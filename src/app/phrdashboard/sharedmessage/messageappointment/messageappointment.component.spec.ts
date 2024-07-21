import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageappointmentComponent } from './messageappointment.component';

describe('MessageappointmentComponent', () => {
  let component: MessageappointmentComponent;
  let fixture: ComponentFixture<MessageappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
