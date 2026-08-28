import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculadora } from './calculadora';

describe('Calculadora', () => {
  let component: Calculadora;
  let fixture: ComponentFixture<Calculadora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calculadora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculadora);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
