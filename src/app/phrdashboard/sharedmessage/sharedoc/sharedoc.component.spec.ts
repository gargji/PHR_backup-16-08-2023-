import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedocComponent } from './sharedoc.component';

describe('SharedocComponent', () => {
  let component: SharedocComponent;
  let fixture: ComponentFixture<SharedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
