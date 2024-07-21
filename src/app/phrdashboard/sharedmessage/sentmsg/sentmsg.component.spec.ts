import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentmsgComponent } from './sentmsg.component';

describe('SentmsgComponent', () => {
  let component: SentmsgComponent;
  let fixture: ComponentFixture<SentmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentmsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
