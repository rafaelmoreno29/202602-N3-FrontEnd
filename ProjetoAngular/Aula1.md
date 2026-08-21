# Aula 1 — Introdução ao Angular com Bootstrap

## Objetivo

Criar um projeto Angular do zero, organizá-lo em componentes reutilizáveis e integrar a biblioteca Bootstrap (via ng-bootstrap) para estilização e componentes visuais.

---

## Tecnologias utilizadas

| Tecnologia | Versão |
|---|---|
| Angular | 20.x |
| Angular CLI | 20.x |
| ng-bootstrap | 19.x |
| Bootstrap | 5.x |
| TypeScript | — |

---

## Estrutura do projeto gerada

```
src/
  index.html          ← ponto de entrada HTML
  main.ts             ← bootstrap da aplicação
  styles.css          ← estilos globais
  app/
    app.ts            ← componente raiz (App)
    app.html          ← template raiz
    app-module.ts     ← módulo principal (NgModule)
    app-routing-module.ts  ← módulo de rotas
    menu-superior/    ← componente de navegação
    destaque/         ← componente de carrossel
    noticia/          ← componente de listagem de notícias
```

---

## Conceitos abordados

### 1. Criação do projeto com Angular CLI

```bash
ng new ProjetoAngular --standalone=false --routing
```

Gera a estrutura inicial com `AppModule`, roteamento e arquivos de configuração (`angular.json`, `tsconfig.json`).

### 2. Componentes Angular

Cada componente é composto por quatro arquivos:

| Arquivo | Função |
|---|---|
| `*.ts` | Classe do componente (lógica) |
| `*.html` | Template (estrutura visual) |
| `*.css` | Estilos encapsulados |
| `*.spec.ts` | Testes unitários |

Componentes criados:

- **`MenuSuperior`** — barra de navegação superior com links usando Bootstrap `nav-pills`
- **`Destaque`** — carrossel de imagens usando `ngb-carousel` do ng-bootstrap
- **`Noticia`** — grid responsivo com colunas Bootstrap para exibição de cards de notícias

### 3. Decorador `@Component`

```typescript
@Component({
  selector: 'app-menu-superior',
  standalone: false,
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css',
})
export class MenuSuperior { }
```

- `selector`: nome da tag HTML personalizada usada no template
- `templateUrl` / `styleUrl`: arquivos externos de template e estilo
- `standalone: false`: componente pertence a um `NgModule`

### 4. NgModule — `app-module.ts`

Todos os componentes são declarados no módulo principal:

```typescript
@NgModule({
  declarations: [App, MenuSuperior, Destaque, Noticia],
  imports: [BrowserModule, AppRoutingModule, NgbModule, NgbCarousel, NgbSlide],
  bootstrap: [App]
})
export class AppModule { }
```

- `declarations`: componentes pertencentes a este módulo
- `imports`: módulos externos (Bootstrap, ng-bootstrap, Roteamento)
- `bootstrap`: componente raiz que inicia a aplicação

### 5. Roteamento — `app-routing-module.ts`

Configuração inicial vazia, preparada para adicionar rotas futuramente:

```typescript
const routes: Routes = [];
```

### 6. Template raiz — `app.html`

Organiza os componentes na página usando o container do Bootstrap:

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <app-destaque></app-destaque>
  <app-noticia></app-noticia>
  <router-outlet />
</div>
```

- `<router-outlet>`: área onde os componentes de rota são renderizados

### 7. Property Binding — Componente `Destaque`

Demonstra o uso de **property binding** (`[src]`) para vincular propriedades do componente ao template:

```typescript
// destaque.ts
images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
```

```html
<!-- destaque.html -->
<img class="w-100" [src]="images[0]" alt="..." />
```

### 8. Diretiva `@if` (control flow)

Renderização condicional usando a sintaxe moderna de control flow do Angular:

```html
@if (images) {
  <ngb-carousel> ... </ngb-carousel>
}
```

### 9. ng-bootstrap — Carrossel

Uso do componente `ngb-carousel` para criar um slider de imagens:

```html
<ngb-carousel>
  <ng-template ngbSlide>
    <img [src]="images[0]" />
    <div class="carousel-caption">
      <h3>Título</h3>
      <p>Descrição</p>
    </div>
  </ng-template>
</ngb-carousel>
```

### 10. Grid responsivo Bootstrap — Componente `Noticia`

Layout de colunas responsivas com Bootstrap:

```html
<div class="row">
  <div class="col-md-4 col-12">card1</div>
  <div class="col-md-4 col-12">card2</div>
  <div class="col-md-4 col-12">card3</div>
</div>
```

- `col-12`: ocupa 100% da largura em telas pequenas
- `col-md-4`: ocupa 1/3 da largura em telas médias e maiores

---

## Resumo do fluxo da aplicação

```
index.html
  └── <app-root>  (App)
        ├── <app-menu-superior>  → barra de navegação
        ├── <app-destaque>       → carrossel de imagens
        └── <router-outlet>      → conteúdo das rotas (futuro: Noticia)
```

---

## Comandos úteis

```bash
# Iniciar servidor de desenvolvimento
ng serve

# Gerar um novo componente
ng generate component nome-do-componente

# Executar testes
ng test

# Build de produção
ng build
```
