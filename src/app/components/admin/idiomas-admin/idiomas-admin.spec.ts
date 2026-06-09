import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomasAdmin } from './idiomas-admin';

describe('IdiomasAdmin', () => {
  let component: IdiomasAdmin;
  let fixture: ComponentFixture<IdiomasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdiomasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(IdiomasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});