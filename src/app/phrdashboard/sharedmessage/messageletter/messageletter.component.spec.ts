import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageletterComponent } from './messageletter.component';

describe('MessageletterComponent', () => {
  let component: MessageletterComponent;
  let fixture: ComponentFixture<MessageletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
