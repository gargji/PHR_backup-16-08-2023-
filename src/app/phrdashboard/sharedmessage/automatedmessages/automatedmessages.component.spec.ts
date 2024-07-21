import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedmessagesComponent } from './automatedmessages.component';

describe('AutomatedmessagesComponent', () => {
  let component: AutomatedmessagesComponent;
  let fixture: ComponentFixture<AutomatedmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomatedmessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomatedmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
