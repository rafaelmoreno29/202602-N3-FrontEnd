# Aula 2 — Roteamento no Angular

## Objetivo

Implementar o sistema de roteamento do Angular, criando novas páginas (componentes de rota) e configurando a navegação entre elas, incluindo uma página de erro 404 para rotas inexistentes.

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

## Estrutura do projeto após a aula

```
src/
  app/
    app.ts
    app.html                      ← simplificado: apenas menu + router-outlet
    app-module.ts                 ← novos componentes declarados
    app-routing-module.ts         ← rotas configuradas
    menu-superior/
      menu-superior.html          ← links com routerLink e routerLinkActive
    home/                         ← novo componente de página inicial
      home.html                   ← contém destaque + noticia
    cliente/                      ← novo componente de clientes
    pagina-nao-encontrada/        ← novo componente de erro 404
```

---

## Conceitos abordados

### 1. Geração de componentes via Angular CLI

Novos componentes foram criados com o comando `ng generate component` (ou sua forma abreviada `ng g c`):

```bash
ng g c Home
ng g c Cliente
ng g c PaginaNaoEncontrada
```

Cada comando gera automaticamente os quatro arquivos do componente (`.ts`, `.html`, `.css`, `.spec.ts`) e registra o componente no `AppModule`.

### 2. Configuração de rotas — `app-routing-module.ts`

O array `routes` foi preenchido com os caminhos da aplicação:

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cliente', component: Cliente },
  { path: '**', component: PaginaNaoEncontrada }
];
```

| Propriedade | Descrição |
|---|---|
| `path` | Segmento de URL que ativa a rota |
| `component` | Componente renderizado na rota |
| `redirectTo` | Redireciona para outra rota |
| `pathMatch: 'full'` | Exige correspondência exata da URL (necessário no redirect) |
| `path: '**'` | Rota curinga — captura qualquer URL não mapeada (deve ser a última) |

### 3. `RouterModule.forRoot()`

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- `forRoot(routes)`: registra as rotas na raiz da aplicação. Deve ser chamado apenas uma vez, no módulo principal.
- `exports: [RouterModule]`: expõe as diretivas `routerLink` e `router-outlet` para os componentes do `AppModule`.

### 4. `<router-outlet>` — `app.html`

O componente raiz foi simplificado. O `<app-destaque>` foi removido daqui e movido para `home.html`:

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <router-outlet />
</div>
```

- `<router-outlet>`: marcador onde o Angular injeta dinamicamente o componente correspondente à rota ativa. Quando o usuário navega para `/home`, o componente `Home` é renderizado neste local.

### 5. Diretiva `routerLink` — `menu-superior.html`

Substitui o atributo `href` padrão do HTML para navegação interna sem recarregar a página:

```html
<header class="d-flex justify-content-center py-3">
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a>
    </li>
    <li class="nav-item">
      <a routerLink="/cliente" routerLinkActive="active" class="nav-link">Clientes</a>
    </li>
  </ul>
</header>
```

| Diretiva | Função |
|---|---|
| `routerLink="/home"` | Define o caminho de navegação (equivalente ao `href`, mas para o roteador Angular) |
| `routerLinkActive="active"` | Adiciona a classe CSS `active` automaticamente quando a rota correspondente está ativa |

### 6. Componente `Home` — página inicial

O componente `Home` assumiu o papel de página inicial. Seu template reutiliza os componentes já existentes:

```html
<!-- home.html -->
<app-destaque></app-destaque>
<app-noticia></app-noticia>
```

Isso demonstra a **composição de componentes**: um componente pode incluir outros dentro de seu template, tornando o código modular e reutilizável.

### 7. Componente `PaginaNaoEncontrada` — erro 404

Página de feedback para o usuário quando a URL acessada não corresponde a nenhuma rota cadastrada:

```html
<!-- pagina-nao-encontrada.html -->
<div class="container text-center py-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h1 class="display-1 fw-bold text-danger">404</h1>
      <p class="fs-3">
        <span class="text-danger">Ops!</span> Página não encontrada.
      </p>
      <p class="lead text-secondary">
        A página que você está procurando não existe ou foi removida.
      </p>
      <a routerLink="/home" class="btn btn-primary mt-3">Voltar para a Home</a>
    </div>
  </div>
</div>
```

- Usa classes Bootstrap para centralizar e estilizar o conteúdo (`display-1`, `text-danger`, `lead`)
- Usa `routerLink="/home"` em um botão para redirecionar o usuário de volta à home

### 8. Declaração dos novos componentes no `AppModule`

Todo componente criado precisa ser declarado no `NgModule` para poder ser usado na aplicação:

```typescript
@NgModule({
  declarations: [
    App,
    MenuSuperior,
    Destaque,
    Noticia,
    Home,
    Cliente,
    PaginaNaoEncontrada   // ← novos componentes adicionados
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,      // ← fornece o sistema de roteamento
    NgbModule,
    NgbCarousel, NgbSlide,
    NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole,
    NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]
})
export class AppModule { }
```

---

## Resumo do fluxo de roteamento

```
URL acessada
  │
  ▼
AppRoutingModule (verifica as rotas)
  ├── /          → redireciona para /home
  ├── /home      → renderiza <Home> no <router-outlet>
  │                   └── <app-destaque> + <app-noticia>
  ├── /cliente   → renderiza <Cliente> no <router-outlet>
  └── /**        → renderiza <PaginaNaoEncontrada> no <router-outlet>

index.html
  └── <app-root>  (App)
        ├── <app-menu-superior>  → barra de navegação (routerLink)
        └── <router-outlet>      → componente da rota ativa
```

---

## Comandos utilizados

```bash
# Gerar componente Home
ng g c Home

# Gerar componente Cliente
ng g c Cliente

# Gerar componente PaginaNaoEncontrada
ng g c PaginaNaoEncontrada

# Iniciar servidor de desenvolvimento
ng serve
```

---

## Comparação com a Aula 1

| Aspecto | Aula 1 | Aula 2 |
|---|---|---|
| Rotas | Array vazio | Home, Cliente, 404 configuradas |
| `app.html` | Menu + Destaque + `<router-outlet>` | Menu + `<router-outlet>` (Destaque movido para Home) |
| Navegação | Sem links funcionais | `routerLink` + `routerLinkActive` |
| Páginas | Conteúdo fixo | Conteúdo dinâmico por rota |
| Erro 404 | Não existia | Rota curinga `**` com página personalizada |
