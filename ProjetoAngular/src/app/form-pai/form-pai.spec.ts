import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPai } from './form-pai';

describe('FormPai', () => {
  let component: FormPai;
  let fixture: ComponentFixture<FormPai>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPai]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPai);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
