import { Component } from '@angular/core';

@Component({
  selector: 'app-destaque',
  standalone: false,
  templateUrl: './destaque.html',
  styleUrl: './destaque.css',
})
export class Destaque {
images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
