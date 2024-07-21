import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagedraftsComponent } from './messagedrafts.component';

describe('MessagedraftsComponent', () => {
  let component: MessagedraftsComponent;
  let fixture: ComponentFixture<MessagedraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagedraftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagedraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
