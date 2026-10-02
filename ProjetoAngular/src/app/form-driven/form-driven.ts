import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '../services/storage';

@Component({
  selector: 'app-form-driven',
  standalone: false,
  templateUrl: './form-driven.html',
  styleUrl: './form-driven.css',
})
export class FormDriven implements OnInit {
  nome: string = '';
  email: string = '';

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.nome = this.storage.getSessionStorage('nome') || '';
    this.email = this.storage.getSessionStorage('email') || '';
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert("Formulário inválido!");
      return;
    }
    this.storage.setSessionStorage('nome', this.nome);
    this.storage.setSessionStorage('email', this.email);

    console.log("Form é válido? ", form.valid);
  }
}
