import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommancontrolvalidatorsComponent } from './commancontrolvalidators.component';

describe('CommancontrolvalidatorsComponent', () => {
  let component: CommancontrolvalidatorsComponent;
  let fixture: ComponentFixture<CommancontrolvalidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommancontrolvalidatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommancontrolvalidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
