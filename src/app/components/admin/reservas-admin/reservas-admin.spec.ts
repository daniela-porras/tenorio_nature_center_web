import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAdmin } from './reservas-admin';

describe('ReservasAdmin', () => {
  let component: ReservasAdmin;
  let fixture: ComponentFixture<ReservasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
