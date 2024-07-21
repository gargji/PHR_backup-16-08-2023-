import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTaskComponent } from './patient-task.component';

describe('PatientTaskComponent', () => {
  let component: PatientTaskComponent;
  let fixture: ComponentFixture<PatientTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
