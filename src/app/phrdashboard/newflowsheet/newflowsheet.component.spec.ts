import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflowsheetComponent } from './newflowsheet.component';

describe('NewflowsheetComponent', () => {
  let component: NewflowsheetComponent;
  let fixture: ComponentFixture<NewflowsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewflowsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewflowsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
