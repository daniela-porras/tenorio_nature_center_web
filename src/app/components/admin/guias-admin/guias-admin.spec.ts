import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasAdmin } from './guias-admin';


describe('GuiasAdmin', () => {
  let component: GuiasAdmin;
  let fixture: ComponentFixture<GuiasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(GuiasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
