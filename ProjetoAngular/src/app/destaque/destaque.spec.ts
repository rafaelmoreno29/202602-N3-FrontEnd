import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Destaque } from './destaque';

describe('Destaque', () => {
  let component: Destaque;
  let fixture: ComponentFixture<Destaque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Destaque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Destaque);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
