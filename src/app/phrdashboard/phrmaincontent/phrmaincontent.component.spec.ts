import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHRMaincontentComponent } from './phrmaincontent.component';

describe('PHRMaincontentComponent', () => {
  let component: PHRMaincontentComponent;
  let fixture: ComponentFixture<PHRMaincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PHRMaincontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHRMaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
