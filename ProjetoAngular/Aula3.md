# Aula 3 — Data Binding no Angular

## Objetivo

Compreender e aplicar os mecanismos de **Data Binding** do Angular para criar componentes interativos que sincronizam dados entre a classe TypeScript e o template HTML, sem manipulação direta do DOM.

---

## Tecnologias utilizadas

| Tecnologia | Versão |
|---|---|
| Angular | 20.x |
| Angular CLI | 20.x |
| ng-bootstrap | 19.x |
| Bootstrap | 5.x |
| TypeScript | — |
| FormsModule | Angular |

---

## Estrutura do projeto após a aula

```
src/
  app/
    app-module.ts               ← FormsModule adicionado aos imports
    app-routing-module.ts       ← rotas /calculadora e /desconto adicionadas
    menu-superior/
      menu-superior.html        ← links Calculadora e Desconto adicionados
    calculadora/                ← novo componente
      calculadora.ts            ← propriedades num1, num2, resultado, operacao + métodos
      calculadora.html          ← usa [(ngModel)] e (click)
    desconto/                   ← novo componente
      desconto.ts               ← propriedades valorProduto, percentualDesconto, valorFinal
      desconto.html             ← usa [(ngModel)] e (click)
```

---

## Conceito central: Data Binding

**Data Binding** é o mecanismo que sincroniza automaticamente os dados da **classe do componente** (TypeScript) com o **template** (HTML) e vice-versa. Elimina a necessidade de manipular o DOM manualmente (como se faz com `document.getElementById` no JavaScript puro).

O Angular oferece quatro formas de Data Binding, organizadas por **direção do fluxo de dados**:

```
Classe TypeScript  ──────────────────────────────────────────  Template HTML
       │                                                              │
       │  Interpolação  {{ valor }}                ──────────►       │
       │  Property Binding  [propriedade]="valor"  ──────────►       │
       │  Event Binding  (evento)="método()"       ◄──────────       │
       │  Two-way Binding  [(ngModel)]="propriedade"  ◄───────►      │
```

---

## As quatro formas de Data Binding

### 1. Interpolação — `{{ expressão }}`

**Direção:** Classe → Template (one-way)

Exibe o valor de uma propriedade da classe diretamente no HTML. A expressão entre `{{ }}` é avaliada e convertida para string.

```typescript
// componente.ts
export class Exemplo {
  titulo: string = 'Bem-vindo!';
  quantidade: number = 42;
}
```

```html
<!-- componente.html -->
<h1>{{ titulo }}</h1>
<p>Itens encontrados: {{ quantidade }}</p>
<p>Resultado: {{ 2 + 2 }}</p>
```

**Casos de uso:** exibir textos, valores numéricos, resultados de expressões simples.

---

### 2. Property Binding — `[propriedade]="expressão"`

**Direção:** Classe → Template (one-way)

Vincula uma **propriedade de um elemento HTML** (ou diretiva/componente) a um valor da classe. Usa colchetes `[ ]`.

```typescript
export class Exemplo {
  urlImagem: string = 'assets/foto.jpg';
  botaoDesabilitado: boolean = true;
}
```

```html
<img [src]="urlImagem" />
<button [disabled]="botaoDesabilitado">Enviar</button>
```

> **Diferença entre `src="..."` e `[src]="..."`:**  
> `src="urlImagem"` passa a string literal `"urlImagem"`.  
> `[src]="urlImagem"` avalia a expressão e passa o **valor** da variável.

---

### 3. Event Binding — `(evento)="método()"`

**Direção:** Template → Classe (one-way)

Captura eventos do DOM (cliques, mudanças, teclas pressionadas) e chama métodos da classe. Usa parênteses `( )`.

```typescript
export class Exemplo {
  contador: number = 0;

  incrementar() {
    this.contador++;
  }
}
```

```html
<button (click)="incrementar()">+1</button>
<p>{{ contador }}</p>
```

**Eventos comuns:**

| Evento | Descrição |
|---|---|
| `(click)` | clique do mouse |
| `(input)` | digitação em campo de texto |
| `(change)` | mudança de valor |
| `(submit)` | envio de formulário |
| `(keyup)` | tecla solta |
| `(blur)` | campo perde o foco |

---

### 4. Two-way Binding — `[(ngModel)]="propriedade"`

**Direção:** Classe ↔ Template (bidirecional)

Sincroniza um campo de formulário com uma propriedade da classe nos **dois sentidos**: qualquer alteração no input atualiza a classe, e qualquer alteração na classe atualiza o input. Usa a sintaxe "banana na caixa" `[( )]`.

```typescript
export class Exemplo {
  nome: string = '';
}
```

```html
<input [(ngModel)]="nome" />
<p>Olá, {{ nome }}!</p>
```

**Pré-requisito:** o `FormsModule` deve estar importado no módulo da aplicação.

```typescript
// app-module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule   // ← obrigatório para usar [(ngModel)]
  ]
})
```

> A sintaxe `[(ngModel)]` é uma abreviação de `[ngModel]="prop" (ngModelChange)="prop = $event"` — ela combina Property Binding e Event Binding em uma única expressão.

---

## Implementação na aula

### Componente `Calculadora`

Demonstra o two-way binding com múltiplos inputs e um `<select>`, além de event binding no botão.

**`calculadora.ts`**
```typescript
export class Calculadora {
  num1: number = 0;
  num2: number = 0;
  resultado: number = 0;
  operacao: string = '+';

  calcular() {
    switch (this.operacao) {
      case '+': this.resultado = this.num1 + this.num2; break;
      case '-': this.resultado = this.num1 - this.num2; break;
      case '*': this.resultado = this.num1 * this.num2; break;
      case '/': this.resultado = this.num1 / this.num2; break;
    }
  }

  limpar() {
    this.num1 = 0;
    this.num2 = 0;
    this.resultado = 0;
    this.operacao = '+';
  }
}
```

**`calculadora.html`**
```html
<input type="number" [(ngModel)]="num1" class="form-control" />
<input type="number" [(ngModel)]="num2" class="form-control" />
<select [(ngModel)]="operacao" class="form-control">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">*</option>
    <option value="/">/</option>
</select>
<input type="number" [(ngModel)]="resultado" class="form-control" readonly />
<button class="btn btn-primary" (click)="calcular()">Calcular</button>
<button class="btn btn-danger" (click)="limpar()">Limpar</button>
```

**Bindings utilizados:**
- `[(ngModel)]="num1/num2/operacao"` — sincroniza os inputs com as propriedades da classe
- `[(ngModel)]="resultado"` com `readonly` — exibe o resultado (neste caso funciona como property binding unidirecional na prática)
- `(click)="calcular()"` / `(click)="limpar()"` — event binding nos botões

---

### Componente `Desconto`

Demonstra validação de dados antes do cálculo, com mensagem de erro via `alert()`.

**`desconto.ts`**
```typescript
export class Desconto {
  valorProduto: number = 0;
  percentualDesconto: number = 0;
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
```

**`desconto.html`**
```html
<label class="form-label">Valor do Produto</label>
<input type="number" [(ngModel)]="valorProduto" class="form-control" />
<label class="form-label">% de Desconto</label>
<input type="number" [(ngModel)]="percentualDesconto" class="form-control" />
<label class="form-label">Valor Final</label>
<input type="number" [(ngModel)]="valorFinal" class="form-control" readonly />
<button class="btn btn-primary" (click)="calcularDesconto()">Calcular</button>
```

---

## Novas rotas adicionadas

```typescript
// app-routing-module.ts
const routes: Routes = [
  { path: '',            redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',        component: Home },
  { path: 'cliente',     component: Cliente },
  { path: 'calculadora', component: Calculadora },  // ← novo
  { path: 'desconto',    component: Desconto },     // ← novo
  { path: '**',          component: PaginaNaoEncontrada }
];
```

---

## Comparativo dos tipos de Data Binding

| Tipo | Sintaxe | Direção | Módulo necessário | Uso típico |
|---|---|---|---|---|
| Interpolação | `{{ prop }}` | Classe → Template | — | Exibir valores no HTML |
| Property Binding | `[prop]="valor"` | Classe → Template | — | Atributos HTML, `[src]`, `[disabled]` |
| Event Binding | `(evento)="fn()"` | Template → Classe | — | Cliques, digitação, submissão |
| Two-way Binding | `[(ngModel)]="prop"` | Bidirecional | `FormsModule` | Campos de formulário |

---

## Comandos utilizados na aula

```bash
# Geração dos componentes
ng g c Calculadora
ng g c Desconto
```

---

## Resumo

Nesta aula foi introduzido o conceito fundamental de **Data Binding**, que é o coração da reatividade no Angular. Os quatro tipos foram apresentados progressivamente:

1. **Interpolação** para exibir dados no template
2. **Property Binding** para controlar atributos HTML via classe
3. **Event Binding** para reagir a ações do usuário
4. **Two-way Binding** (`[(ngModel)]`) para sincronização bidirecional em formulários

A prática foi consolidada na construção de dois componentes funcionais — `Calculadora` e `Desconto` — que combinam `[(ngModel)]` nos inputs com `(click)` nos botões para criar formulários reativos sem nenhuma manipulação direta do DOM.
