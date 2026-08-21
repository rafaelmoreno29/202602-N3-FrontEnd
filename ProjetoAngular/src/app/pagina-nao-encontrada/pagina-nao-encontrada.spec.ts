import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNaoEncontrada } from './pagina-nao-encontrada';

describe('PaginaNaoEncontrada', () => {
  let component: PaginaNaoEncontrada;
  let fixture: ComponentFixture<PaginaNaoEncontrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaNaoEncontrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNaoEncontrada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
