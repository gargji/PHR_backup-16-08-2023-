import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySignaturesComponent } from './my-signatures.component';

describe('MySignaturesComponent', () => {
  let component: MySignaturesComponent;
  let fixture: ComponentFixture<MySignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
