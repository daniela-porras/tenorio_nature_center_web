import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferAdmin } from './chofer-admin';

describe('ChoferAdmin', () => {
  let component: ChoferAdmin;
  let fixture: ComponentFixture<ChoferAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoferAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
