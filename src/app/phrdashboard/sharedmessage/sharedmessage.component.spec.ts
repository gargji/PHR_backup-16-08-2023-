import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedmessageComponent } from './sharedmessage.component';

describe('SharedmessageComponent', () => {
  let component: SharedmessageComponent;
  let fixture: ComponentFixture<SharedmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
