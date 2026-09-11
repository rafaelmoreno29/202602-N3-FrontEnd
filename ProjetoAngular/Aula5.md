# Aula 5 — Diretivas e lista de clientes

## Objetivo da aula

Implementar uma lista de clientes no componente `Cliente`, utilizando diretivas do Angular para controlar a exibição, repetir registros, aplicar estilos e escolher ações conforme o status de cada cliente.

---

## Arquivos criados ou alterados hoje

```text
src/app/cliente/cliente.ts       lógica e dados dos clientes
src/app/cliente/cliente.html     formulário, tabela e diretivas
src/app/cliente/cliente.css      estilos dos status
src/app/models/ICliente.ts        modelo de dados do cliente
```

---

## Modelo `ICliente`

Foi criada a interface que define o formato de um cliente:

```typescript
export interface ICliente {
  id: number;
  nome: string;
  ativo: boolean;
}
```

Cada cliente possui um identificador, um nome e um status que informa se está ativo ou inativo.

---

## Alterações no componente `Cliente`

Foi importada a interface `ICliente` e criada uma lista inicial:

```typescript
listaClientes: ICliente[] = [
  { id: 1, nome: 'Rafael', ativo: true },
  { id: 2, nome: 'Maria', ativo: true },
  { id: 3, nome: 'João', ativo: false },
];
```

Também foram adicionadas as propriedades:

```typescript
mostrarTabela: boolean = true;
pesquisar: string = '';
```

- `mostrarTabela` controla se a tabela aparece na tela.
- `pesquisar` armazena o texto digitado para pesquisa.

Foi criado o método para adicionar clientes:

```typescript
adicionarCliente() {
  this.listaClientes.push({
    id: this.listaClientes.length + 1,
    nome: this.nome,
    ativo: true
  });
  this.nome = '';
}
```

O método adiciona um cliente ativo, gera um novo `id` e limpa o campo de nome após o cadastro.

---

## Alterações no template `cliente.html`

### Controle da tabela com `@if`

A tabela só é exibida quando `mostrarTabela` possui o valor `true`:

```html
<input type="checkbox" [(ngModel)]="mostrarTabela" />

@if (mostrarTabela) {
  <!-- tabela de clientes -->
}
```

O `[(ngModel)]` mantém o checkbox sincronizado com a propriedade da classe. Ao marcar ou desmarcar o checkbox, a tabela aparece ou desaparece.

### Repetição dos clientes com `@for`

A diretiva `@for` percorre a lista e cria uma linha para cada cliente:

```html
@for (cliente of listaClientes; track cliente.id) {
  <tr>
    <td>{{ cliente.id }}</td>
    <td>{{ cliente.nome }}</td>
  </tr>
}
```

O trecho `track cliente.id` ajuda o Angular a identificar cada registro e atualizar somente os elementos necessários.

Em versões antigas do Angular, esse comportamento era escrito com `*ngFor`:

```html
<tr *ngFor="let cliente of listaClientes">
  <td>{{ cliente.nome }}</td>
</tr>
```

### Estilo de pesquisa com `[style]`

O nome pesquisado é destacado com fundo amarelo:

```html
<td [style]="{
  'background-color': cliente.nome == pesquisar
    ? 'yellow'
    : 'transparent'
}">
  {{ cliente.nome }}
</td>
```

A expressão condicional compara o nome do cliente com o texto digitado no campo de pesquisa.

### Classes dinâmicas com `[ngClass]`

O status recebe uma classe diferente conforme o valor de `cliente.ativo`:

```html
<td [ngClass]="{
  ativo: cliente.ativo,
  inativo: !cliente.ativo
}">
  {{ cliente.ativo ? 'Ativo' : 'Inativo' }}
</td>
```

- Se `cliente.ativo` for `true`, a classe `ativo` será aplicada.
- Se `cliente.ativo` for `false`, a classe `inativo` será aplicada.

### Ações condicionais com `@switch` e `@case`

O botão exibido depende do status atual:

```html
@switch (cliente.ativo) {
  @case (true) {
    <button (click)="cliente.ativo = !cliente.ativo">
      Desativar
    </button>
  }
  @case (false) {
    <button (click)="cliente.ativo = !cliente.ativo">
      Ativar
    </button>
  }
}
```

Quando o cliente está ativo, o botão permite desativá-lo. Quando está inativo, o botão permite ativá-lo. A expressão `!cliente.ativo` inverte o valor atual.

---

## Estilos criados no `cliente.css`

Foram criadas classes para diferenciar visualmente os status:

```css
.ativo {
  background-color: green;
  border-radius: 15px;
  color: white;
  width: 100px;
}

.inativo {
  background-color: red;
  border-radius: 15px;
  color: white;
  width: 100px;
}
```

Clientes ativos aparecem com fundo verde e clientes inativos aparecem com fundo vermelho.

---

## O que são diretivas?

Diretivas são instruções que o Angular aplica aos elementos do template para modificar sua estrutura, aparência ou comportamento.

Nesta aula foram utilizadas as seguintes diretivas e recursos de controle de fluxo:

| Diretiva ou recurso | Função na aula |
|---|---|
| `@if` | Mostra ou esconde a tabela |
| `@for` | Repete uma linha para cada cliente |
| `@switch` e `@case` | Escolhem o botão conforme o status |
| `[ngClass]` | Aplica as classes `ativo` e `inativo` |
| `[style]` | Altera a cor de fundo do nome pesquisado |
| `[(ngModel)]` | Sincroniza inputs e checkbox com a classe |
| `(click)` | Executa ações dos botões |
| `{{ }}` | Exibe valores do cliente no HTML |

As diretivas de controle de fluxo, como `@if`, `@for` e `@switch`, alteram quais elementos serão renderizados. As diretivas de atributo, como `[ngClass]` e `[style]`, modificam elementos que já existem no template.

---

## Resultado da aula

O componente `Cliente` passou a permitir:

- exibir ou ocultar a tabela;
- cadastrar novos clientes;
- listar os clientes cadastrados;
- pesquisar um cliente pelo nome;
- destacar visualmente o resultado da pesquisa;
- identificar clientes ativos e inativos;
- ativar ou desativar clientes pelos botões de ação.
