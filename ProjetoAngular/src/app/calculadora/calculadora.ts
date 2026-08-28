import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora {
  num1: number = 0;
  num2: number = 0;
  resultado: number = 0;
  operacao: string = '+';
  calcular() {
    switch (this.operacao) {
      case '+':
        this.resultado = this.num1 + this.num2;
        break;
      case '-':
        this.resultado = this.num1 - this.num2;
        break;
      case '*':
        this.resultado = this.num1 * this.num2;
        break;
      case '/':
        this.resultado = this.num1 / this.num2;
        break;
    }
  }
  limpar() {
    this.num1 = 0;
    this.num2 = 0;
    this.resultado = 0;
    this.operacao = '+';
  }
}
