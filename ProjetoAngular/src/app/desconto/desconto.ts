import { Component } from '@angular/core';

@Component({
  selector: 'app-desconto',
  standalone: false,
  templateUrl: './desconto.html',
  styleUrl: './desconto.css',
})
export class Desconto {
  valorProduto: number = 0;
  percentualDesconto: number = 0
  valorFinal: number = 0;

  calcularDesconto() {
    if (this.percentualDesconto < 0 || this.percentualDesconto > 20) {
      alert('O percentual de desconto deve ser entre 0 e 20%');
      return;
    }
    this.valorFinal = this.valorProduto -
      (this.valorProduto * this.percentualDesconto / 100);
  }
}
