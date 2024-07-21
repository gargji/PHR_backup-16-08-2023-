import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompousemessageComponent } from './compousemessage.component';

describe('CompousemessageComponent', () => {
  let component: CompousemessageComponent;
  let fixture: ComponentFixture<CompousemessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompousemessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompousemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
