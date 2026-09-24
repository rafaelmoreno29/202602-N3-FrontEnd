# Aula 6 — Formulário Template-Driven

## Objetivo da aula

Criar um formulário de cadastro utilizando a abordagem **template-driven** do Angular, com campos para nome e e-mail, validações no template e tratamento do envio no componente.

---

## Arquivos utilizados

```text
src/app/form-driven/form-driven.ts       lógica do formulário
src/app/form-driven/form-driven.html     campos, validações e botões
src/app/form-driven/form-driven.css      estilos do componente
src/app/app-module.ts                    importação do FormsModule e declaração do componente
```

O componente `FormDriven` foi declarado no `AppModule`, e o `FormsModule` foi importado para disponibilizar `ngForm` e `ngModel`.

---

## O que é um formulário template-driven?

Um formulário template-driven é um formulário em que a maior parte da configuração fica no próprio template HTML. Os campos, as regras de validação e o relacionamento com as propriedades do componente são definidos por meio de diretivas do Angular.

Nessa abordagem:

- o HTML define a estrutura do formulário;
- diretivas como `ngForm` e `ngModel` registram e acompanham os campos;
- os valores dos inputs são ligados às propriedades da classe;
- o Angular controla automaticamente o estado e a validade do formulário;
- o componente recebe o formulário pronto no momento do envio.

Essa abordagem é indicada para formulários pequenos ou de complexidade moderada, pois exige menos código de configuração na classe TypeScript.

---

## Configuração necessária

Para usar formulários template-driven, é necessário importar o `FormsModule` no módulo da aplicação:

```typescript
import { FormsModule } from '@angular/forms';
```

Depois, o módulo deve ser incluído na lista de imports:

```typescript
imports: [
  BrowserModule,
  FormsModule
]
```

Sem o `FormsModule`, diretivas como `[(ngModel)]` e `#form="ngForm"` não funcionarão.

---

## Criação do formulário no template

O formulário foi associado a uma variável local chamada `form`:

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <!-- campos do formulário -->
</form>
```

- `#form="ngForm"` cria uma referência para o objeto `NgForm` gerenciado pelo Angular.
- `(ngSubmit)` executa o método `onSubmit` quando o usuário envia o formulário.
- O objeto `form` é passado para o componente para que seu estado e sua validade possam ser consultados.

Cada campo precisa ter um atributo `name` para ser registrado dentro do `NgForm`.

---

## Binding dos campos com `ngModel`

O campo de nome utiliza two-way data binding:

```html
<input
  type="text"
  name="nome"
  [(ngModel)]="nome"
  required
/>
```

O `[(ngModel)]` mantém o input e a propriedade `nome` sincronizados. Quando o usuário digita, a propriedade é atualizada; quando a propriedade muda, o valor exibido no input também é atualizado.

O campo de e-mail utiliza a mesma técnica:

```html
<input
  type="email"
  name="email"
  [(ngModel)]="email"
  required
  email
/>
```

O atributo `required` indica que o campo é obrigatório. A diretiva `email` verifica se o valor possui um formato de e-mail válido.

---

## Validações e mensagens de erro

As mensagens são exibidas somente depois que o usuário tenta enviar o formulário:

```html
@if (form.submitted && form.controls?.['nome']?.errors?.['required']) {
  <div class="alert alert-danger">
    Nome é obrigatório
  </div>
}
```

A expressão verifica duas condições:

- `form.submitted`: o formulário já foi enviado;
- `form.controls['nome'].errors['required']`: o campo de nome está vazio.

Para o e-mail, foram tratadas duas situações:

```html
@if (form.submitted && form.controls?.['email']?.errors?.['required']) {
  <div class="alert alert-danger">
    E-mail é obrigatório
  </div>
}

@if (form.submitted && form.controls?.['email']?.errors?.['email']) {
  <div class="alert alert-danger">
    E-mail é inválido
  </div>
}
```

O operador `?.` evita erros quando o controle ou a coleção de erros ainda não está disponível.

---

## Tratamento do envio no componente

No arquivo TypeScript, as propriedades que recebem os valores dos campos foram declaradas:

```typescript
nome: string = '';
email: string = '';
```

O método de envio recebe um objeto `NgForm`:

```typescript
onSubmit(form: NgForm) {
  if (!form.valid) {
    alert("Formulário inválido!");
    return;
  }

  console.log("Form é válido? ", form.valid);
}
```

Quando o formulário é inválido, uma mensagem é exibida e o processamento é interrompido. Quando é válido, o resultado é registrado no console.

A propriedade `form.valid` é calculada automaticamente pelo Angular com base nas regras dos campos.

---

## Botões do formulário

Foram adicionados dois botões:

```html
<input type="submit" value="Salvar" />
<input type="reset" value="Cancelar" />
```

- `submit` envia o formulário e dispara o evento `(ngSubmit)`.
- `reset` limpa os valores dos campos do formulário.

---

## Fluxo de funcionamento

1. O usuário preenche os campos de nome e e-mail.
2. O `[(ngModel)]` atualiza as propriedades `nome` e `email`.
3. O usuário seleciona o botão **Salvar**.
4. O Angular executa `onSubmit(form)`.
5. As regras `required` e `email` determinam se o formulário é válido.
6. Se houver erro, as mensagens correspondentes são exibidas.
7. Se todos os campos estiverem corretos, o formulário é considerado válido e seu estado é exibido no console.

---

## Resultado da aula

O componente `FormDriven` passou a permitir:

- cadastrar nome e e-mail;
- manter os campos sincronizados com o componente;
- validar campos obrigatórios;
- validar o formato do e-mail;
- exibir mensagens específicas de erro;
- impedir o processamento de formulários inválidos;
- identificar o estado do formulário por meio de `NgForm`.
