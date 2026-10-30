# Aula 13 — API de usuários com MongoDB e Mongoose

## Resumo

Nesta aula, a API de usuários passou a armazenar os dados em um banco MongoDB. O Mongoose foi usado para definir o modelo e executar operações de consulta, criação, atualização e exclusão. As rotas continuam organizadas em um router e a lógica de cada operação fica no controller.

## Conteúdos abordados

- Conexão do Express com o MongoDB usando `mongoose.connect()`.
- Configuração da conexão por meio da variável de ambiente `MONGODB_URI`, carregada com o pacote `dotenv`.
- Definição do modelo `Usuario` em `models/usuario.js`, com os campos:
  - `nome` (texto)
  - `email` (texto)
  - `senha` (texto)
  - `ativo` (booleano)
- Uso de funções assíncronas (`async`/`await`) para aguardar as operações no banco.
- Implementação de operações CRUD:
  - **Create:** `create()` para inserir um usuário.
  - **Read:** `find()`, `findById()`, `findOne()` para consultar usuários.
  - **Update:** `findByIdAndUpdate()` para atualizar um usuário.
  - **Delete:** `findByIdAndDelete()` para excluir um usuário.
- Separação entre rotas, controller e model.

## Rotas disponíveis

Todas as rotas abaixo usam o prefixo `/usuario`:

| Método | Caminho | Ação |
|---|---|---|
| `GET` | `/usuario` | Lista todos os usuários. |
| `GET` | `/usuario/ativo` | Lista usuários com `ativo: true`. |
| `GET` | `/usuario/:id` | Busca um usuário pelo ID do MongoDB. |
| `POST` | `/usuario` | Cadastra um usuário com os dados enviados no corpo JSON. |
| `POST` | `/usuario/autenticar` | Verifica email, senha e se o usuário está ativo. |
| `PUT` | `/usuario/:id` | Atualiza os dados do usuário indicado pelo ID. |
| `DELETE` | `/usuario/:id` | Exclui o usuário indicado pelo ID. |

### Exemplos

Cadastro de usuário:

```http
POST /usuario
Content-Type: application/json
```

```json
{
  "nome": "Ana Silva",
  "email": "ana@example.com",
  "senha": "senha-de-exemplo",
  "ativo": true
}
```

Atualização:

```http
PUT /usuario/ID_DO_USUARIO
Content-Type: application/json
```

```json
{
  "ativo": false
}
```

Autenticação:

```http
POST /usuario/autenticar
Content-Type: application/json
```

```json
{
  "email": "ana@example.com",
  "senha": "senha-de-exemplo"
}
```

## Configuração e execução

Defina `MONGODB_URI` no arquivo `.env` com a string de conexão do seu MongoDB. Não compartilhe nem versione credenciais reais. Com as dependências instaladas, inicie o servidor com:

```bash
npm run dev
```

O servidor inicia na porta `3000` depois que a conexão com o banco é estabelecida. Se a conexão falhar, o erro é exibido no console e o servidor não é iniciado.

## Observações

- O ID usado nas rotas é o identificador `_id` gerado pelo MongoDB.
- As respostas de criação, atualização e exclusão retornam mensagens de sucesso; buscas sem resultado e autenticação inválida retornam erros HTTP.
- A autenticação desta aula é apenas demonstrativa. Em uma aplicação real, senhas não devem ser armazenadas em texto puro; use hash seguro e mecanismos de autenticação apropriados.
