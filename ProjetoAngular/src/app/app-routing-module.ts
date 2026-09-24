import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Cliente } from './cliente/cliente';
import { PaginaNaoEncontrada } from './pagina-nao-encontrada/pagina-nao-encontrada';
import { Calculadora } from './calculadora/calculadora';
import { Desconto } from './desconto/desconto';
import { FormPai } from './form-pai/form-pai';
import { FormReactive } from './form-reactive/form-reactive';
import { FormDriven } from './form-driven/form-driven';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cliente', component: Cliente },
  { path: 'calculadora', component: Calculadora },
  { path: 'desconto', component: Desconto },
  {
    path: 'form-pai', component: FormPai, children: [
      { path: 'form-reactive', component: FormReactive },
      { path: 'form-driven', component: FormDriven }
    ]
  },
  { path: '**', component: PaginaNaoEncontrada }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
