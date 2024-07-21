import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagevaccineComponent } from './messagevaccine.component';

describe('MessagevaccineComponent', () => {
  let component: MessagevaccineComponent;
  let fixture: ComponentFixture<MessagevaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagevaccineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagevaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
