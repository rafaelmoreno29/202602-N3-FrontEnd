# Aula 7 — Formulário Reactive e armazenamento no navegador

## Objetivo da aula

Criar um formulário de cadastro com a abordagem **Reactive Forms** do Angular, validar nome e e-mail e salvar os dados no armazenamento local do navegador. Também conhecer as diferenças entre `localStorage` e `sessionStorage`.

---

## Arquivos utilizados

```text
src/app/form-reactive/form-reactive.ts       configuração e lógica do formulário
src/app/form-reactive/form-reactive.html     campos, mensagens e botões
src/app/services/storage.ts                  serviço para localStorage e sessionStorage
src/app/app-module.ts                        importação do ReactiveFormsModule
```

O componente `FormReactive` foi declarado no `AppModule`. O `ReactiveFormsModule` foi importado para disponibilizar as diretivas de formulários reativos no template.

---

## O que são Reactive Forms?

Nos **Reactive Forms**, a estrutura, os valores e as validações do formulário são definidos principalmente no TypeScript. O template HTML se conecta a essa estrutura por meio de diretivas do Angular.

Essa abordagem oferece controle explícito sobre os campos e seus estados. É útil em formulários que precisam de validações mais elaboradas, atualização dinâmica de campos ou testes unitários mais diretos.

---

## Criação e validação do formulário

No componente, foi criada uma propriedade para armazenar o formulário:

```typescript
form!: FormGroup;
```

O método `criarFormulario()` instancia o `FormGroup` e define os controles:

```typescript
this.form = new FormGroup({
  nome: new FormControl(null, [Validators.required]),
  email: new FormControl(null, [
    Validators.required,
    Validators.email
  ])
});
```

- `FormGroup` representa o formulário completo e reúne seus controles.
- `FormControl` representa um campo individual e mantém seu valor, validade e estado.
- `Validators.required` exige que o campo tenha um valor.
- `Validators.email` verifica se o valor tem formato de e-mail válido.

O formulário é criado em `ngOnInit()`, antes de ser usado pelo template.

---

## Ligação com o template

O formulário HTML é associado ao `FormGroup`, e cada input é associado ao controle correspondente:

```html
<form [formGroup]="form" (ngSubmit)="enviar()">
  <input formControlName="nome" type="text">
  <input formControlName="email" type="email">
</form>
```

- `[formGroup]="form"` conecta o formulário do HTML ao `FormGroup`.
- `formControlName` conecta cada input ao controle definido no TypeScript.
- `(ngSubmit)="enviar()"` chama o método de envio quando o formulário é enviado.

As mensagens de validação verificam se o campo está inválido e se o usuário já interagiu com ele (`touched` ou `dirty`). Assim, os erros não precisam aparecer antes de o usuário começar a preencher o campo.

O botão de envio fica desabilitado enquanto o formulário for inválido:

```html
<button [disabled]="!form.valid" type="submit">Enviar</button>
```

---

## Salvamento e recuperação dos dados

Ao inicializar o componente, o formulário é criado e recebe os dados anteriormente salvos:

```typescript
this.criarFormulario();
this.form.patchValue(this.storage.getLocalStorage('form') || {});
```

`patchValue()` preenche os controles correspondentes com os valores recuperados. Se ainda não houver dados armazenados, é usado um objeto vazio.

No envio, os valores são salvos somente se o formulário estiver válido:

```typescript
enviar() {
  if (this.form.valid) {
    this.storage.setLocalStorage('form', this.form.value);
  }
}
```

O registro é guardado com a chave `form`. Por isso, ao abrir novamente a aplicação no mesmo navegador e origem, os valores podem ser carregados no formulário.

---

## Serviço de armazenamento

O serviço `Storage` centraliza o acesso aos dois mecanismos de armazenamento do navegador. Como Web Storage guarda valores como texto, o serviço converte objetos para JSON antes de salvar e converte o texto de volta ao recuperar:

```typescript
localStorage.setItem(key, JSON.stringify(value));

const value = localStorage.getItem(key);
return value ? JSON.parse(value) : null;
```

O serviço possui métodos equivalentes para `sessionStorage`. Na implementação atual do formulário Reactive, são usados os métodos de **local storage**; os métodos de **session storage** estão disponíveis no serviço, mas ainda não são chamados por esse formulário.

---

## Diferença entre `localStorage` e `sessionStorage`

| Recurso | `localStorage` | `sessionStorage` |
|---|---|---|
| Duração típica | Continua disponível após fechar e reabrir o navegador, até ser removido | Fica disponível durante a sessão da aba e normalmente é removido ao fechar essa aba |
| Escopo | Compartilhado por páginas da mesma origem | Separado por origem e sessão da aba |
| Uso comum | Preferências e dados simples que precisam persistir entre visitas | Dados temporários necessários enquanto a aba está aberta |
| API | `setItem`, `getItem`, `removeItem`, `clear` | `setItem`, `getItem`, `removeItem`, `clear` |

Ambos são armazenamentos locais do navegador, associados à origem da aplicação (protocolo, domínio e porta). Eles não enviam os dados automaticamente a um servidor e não substituem um banco de dados.

Não se deve guardar senhas, tokens ou outras informações sensíveis nesses mecanismos: scripts executados na página podem ter acesso a esses valores. Também é importante considerar que o usuário pode limpar o armazenamento do navegador.

---

## Fluxo de funcionamento

1. O componente inicializa e cria o `FormGroup` com os campos `nome` e `email`.
2. O formulário tenta recuperar o cadastro com a chave `form` no `localStorage`.
3. `patchValue()` preenche os campos quando há valores salvos.
4. O Angular valida os campos conforme os validadores configurados.
5. O template mostra as mensagens depois que o usuário interage com campos inválidos.
6. O botão **Enviar** só fica habilitado quando o formulário é válido.
7. Ao enviar, o componente salva os valores no `localStorage`.

---

## Resultado da aula

O componente `FormReactive` passou a permitir:

- definir campos e validações no TypeScript com `FormGroup`, `FormControl` e `Validators`;
- ligar os inputs do template aos controles reativos;
- exibir mensagens para campos obrigatórios e e-mail inválido;
- impedir o envio enquanto o formulário for inválido;
- salvar os dados do formulário no `localStorage`;
- recuperar os dados salvos ao inicializar o componente;
- conhecer os métodos disponíveis no serviço para `localStorage` e `sessionStorage`.
