import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentshareComponent } from './documentshare.component';

describe('DocumentshareComponent', () => {
  let component: DocumentshareComponent;
  let fixture: ComponentFixture<DocumentshareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentshareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
