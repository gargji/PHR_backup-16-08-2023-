import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsheetComponent } from './flowsheet.component';

describe('FlowsheetComponent', () => {
  let component: FlowsheetComponent;
  let fixture: ComponentFixture<FlowsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
