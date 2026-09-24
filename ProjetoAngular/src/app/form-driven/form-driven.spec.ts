import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDriven } from './form-driven';

describe('FormDriven', () => {
  let component: FormDriven;
  let fixture: ComponentFixture<FormDriven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDriven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDriven);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
