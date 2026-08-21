import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-noticia',
  standalone: false,
  templateUrl: './noticia.html',
  styleUrl: './noticia.css',
})
export class Noticia {
  readonly active = signal(1);
}
