import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagereminderComponent } from './messagereminder.component';

describe('MessagereminderComponent', () => {
  let component: MessagereminderComponent;
  let fixture: ComponentFixture<MessagereminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagereminderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagereminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
