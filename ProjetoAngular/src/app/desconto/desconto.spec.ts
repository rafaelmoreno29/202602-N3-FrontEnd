import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desconto } from './desconto';

describe('Desconto', () => {
  let component: Desconto;
  let fixture: ComponentFixture<Desconto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Desconto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Desconto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
