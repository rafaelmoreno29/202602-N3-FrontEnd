import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Noticia } from './noticia';

describe('Noticia', () => {
  let component: Noticia;
  let fixture: ComponentFixture<Noticia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Noticia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Noticia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
