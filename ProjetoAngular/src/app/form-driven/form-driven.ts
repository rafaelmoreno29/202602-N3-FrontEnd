import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-driven',
  standalone: false,
  templateUrl: './form-driven.html',
  styleUrl: './form-driven.css',
})
export class FormDriven {
  nome: string = '';
  email: string = '';

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert("Formulário inválido!");
      return;
    }

    console.log("Form é válido? ", form.valid);
  }
}
