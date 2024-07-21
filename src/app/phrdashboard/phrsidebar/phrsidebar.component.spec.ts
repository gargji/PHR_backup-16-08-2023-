import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHRsidebarComponent } from './phrsidebar.component';

describe('PHRsidebarComponent', () => {
  let component: PHRsidebarComponent;
  let fixture: ComponentFixture<PHRsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PHRsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHRsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
