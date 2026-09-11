import { Component } from '@angular/core';
import { ICliente } from '../models/ICliente';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {
  nome: string = 'Rafael';
  qtdeClick: number = 0;
  mostrarTabela: boolean = true;
  pesquisar: string = '';
  listaClientes: ICliente[] = [
    { id: 1, nome: 'Rafael', ativo: true },
    { id: 2, nome: 'Maria', ativo: true },
    { id: 3, nome: 'João', ativo: false },
  ];

  adicionarCliente() {
    this.listaClientes.push(
      { id: this.listaClientes.length + 1, nome: this.nome, ativo: true });
    this.nome = '';
  }

  alterarQtdeClick(n: number) {
    this.qtdeClick += n;
  }
}
