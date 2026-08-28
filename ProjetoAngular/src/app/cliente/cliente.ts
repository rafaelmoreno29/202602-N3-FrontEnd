import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {
  nome: string = 'Rafael';
  qtdeClick: number = 0;

  alterarQtdeClick(n: number) {
    this.qtdeClick += n;
  }
}
