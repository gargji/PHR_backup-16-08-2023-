import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagelabsComponent } from './messagelabs.component';

describe('MessagelabsComponent', () => {
  let component: MessagelabsComponent;
  let fixture: ComponentFixture<MessagelabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagelabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagelabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
