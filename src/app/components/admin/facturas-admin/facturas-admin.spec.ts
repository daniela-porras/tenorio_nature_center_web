import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasAdmin } from './facturas-admin';

describe('FacturasAdmin', () => {
  let component: FacturasAdmin;
  let fixture: ComponentFixture<FacturasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(FacturasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
