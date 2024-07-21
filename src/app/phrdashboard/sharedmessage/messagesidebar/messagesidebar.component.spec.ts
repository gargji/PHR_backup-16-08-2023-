import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesidebarComponent } from './messagesidebar.component';

describe('MessagesidebarComponent', () => {
  let component: MessagesidebarComponent;
  let fixture: ComponentFixture<MessagesidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
