import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevebtiveCareComponent } from './prevebtive-care.component';

describe('PrevebtiveCareComponent', () => {
  let component: PrevebtiveCareComponent;
  let fixture: ComponentFixture<PrevebtiveCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevebtiveCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevebtiveCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
