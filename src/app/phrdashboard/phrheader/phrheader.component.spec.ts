import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHRheaderComponent } from './phrheader.component';

describe('PHRheaderComponent', () => {
  let component: PHRheaderComponent;
  let fixture: ComponentFixture<PHRheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PHRheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHRheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
