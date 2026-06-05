import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursAdmin } from './tours-admin';

describe('ToursAdmin', () => {
  let component: ToursAdmin;
  let fixture: ComponentFixture<ToursAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ToursAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
