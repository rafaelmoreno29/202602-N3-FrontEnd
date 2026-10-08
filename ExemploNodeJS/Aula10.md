# Aula 10 — API com Node.js e Express

## Resumo

Nesta aula, criamos uma API simples usando Node.js e Express. A aplicação recebe requisições HTTP, processa parâmetros e dados enviados pelo cliente e retorna respostas no formato JSON.

## Conteúdos abordados

- Criação de uma aplicação Express e inicialização de um servidor na porta `3000`.
- Uso do middleware `express.json()` para interpretar corpos de requisições JSON.
- Criação de rotas:
  - `GET /`: retorna uma mensagem de boas-vindas.
  - `GET /hello`: recebe `nome` e `sobrenome` como parâmetros de consulta e monta uma saudação.
  - `GET /cliente/:id`: lê um parâmetro de rota (`id`) e retorna uma mensagem para o cliente.
  - `POST /maior-numero`: recebe `num1` e `num2` no corpo JSON, compara os valores e retorna o maior.
  - `GET /numeros`: retorna os dados armazenados em memória pelas requisições a `/maior-numero`.
- Acesso a diferentes partes da requisição: `req.query`, `req.params` e `req.body`.
- Envio de respostas JSON com `res.json()`.

## Exemplos de requisição

Saudação com parâmetros de consulta:

```text
GET /hello?nome=Ana&sobrenome=Silva
```

Comparação de números, enviando o corpo como JSON:

```http
POST /maior-numero
Content-Type: application/json
```

```json
{
  "num1": 12,
  "num2": 8
}
```

## Observação

Os números ficam guardados em um array na memória do servidor. Por isso, esse histórico é temporário: ele é perdido quando a aplicação é encerrada ou reiniciada.
