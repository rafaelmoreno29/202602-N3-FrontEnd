import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '../services/storage';

@Component({
  selector: 'app-form-reactive',
  standalone: false,
  templateUrl: './form-reactive.html',
  styleUrl: './form-reactive.css',
})
export class FormReactive implements OnInit {
  form!: FormGroup;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.criarFormulario();
    this.form.patchValue(this.storage.getLocalStorage('form') || {});
  }
  criarFormulario() {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
  enviar() {
    if (this.form.valid) {
      this.storage.setLocalStorage('form', this.form.value);
    }
  }

}
