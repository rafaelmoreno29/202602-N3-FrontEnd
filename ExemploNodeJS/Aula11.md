# Aula 11 — Ajuste de rotas e correção no controller

## Problema identificado

A rota `GET /usuario/admin` estava sendo interpretada como `GET /usuario/:id`. Isso acontecia porque, no Express, a rota dinâmica (`/:id`) capturava o caminho `admin` antes da rota específica.

## O que foi feito

- Reorganização das rotas em [routes/usuarioRouter.js](./routes/usuarioRouter.js):
  - A rota `GET /admin` foi movida para **antes** de `GET /:id`.
  - Ordem final relevante:
    1. `GET /`
    2. `GET /admin`
    3. `GET /:id`
    4. `POST /`
    5. `POST /autenticar`

- Correção no controller em [controllers/usuarioController.js](./controllers/usuarioController.js):
  - Em `obterUsuariosAdmin`, havia conflito de nome de variável (`const usuarios = usuarios.filter(...)`).
  - Foi ajustado para usar `usuariosAdmin`, evitando sobrescrita e erro de execução.

## Resultado

- `GET /usuario/admin` agora retorna corretamente apenas usuários administradores.
- `GET /usuario/:id` continua funcionando para IDs numéricos.
- As rotas deixaram de conflitar.

## Validação realizada

Foi executado um teste de integração local que:

1. Inseriu um usuário admin (`POST /usuario`).
2. Consultou `GET /usuario/admin` e confirmou retorno correto.
3. Consultou `GET /usuario/1` e confirmou retorno do usuário por ID.

Resultado do teste: **PASS**.
