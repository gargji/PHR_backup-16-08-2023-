import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHRDashboardComponent } from './phrdashboard.component';

describe('PHRDashboardComponent', () => {
  let component: PHRDashboardComponent;
  let fixture: ComponentFixture<PHRDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PHRDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHRDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
