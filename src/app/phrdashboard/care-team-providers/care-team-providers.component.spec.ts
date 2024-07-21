import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTeamProvidersComponent } from './care-team-providers.component';

describe('CareTeamProvidersComponent', () => {
  let component: CareTeamProvidersComponent;
  let fixture: ComponentFixture<CareTeamProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareTeamProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareTeamProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
