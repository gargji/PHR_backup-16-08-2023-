import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainphrheaderComponent } from './mainphrheader.component';

describe('MainphrheaderComponent', () => {
  let component: MainphrheaderComponent;
  let fixture: ComponentFixture<MainphrheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainphrheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainphrheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
