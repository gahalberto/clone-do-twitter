# Clone do Twitter (X)

Este projeto é um clone do Twitter (atualmente chamado X), desenvolvido para fins educacionais. Ele simula funcionalidades essenciais da plataforma original, como criação de tweets, curtidas, gestão de usuários, feed de notícias, busca de tweets, entre outros.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no backend.
- **Express.js**: Framework web minimalista para Node.js.
- **TypeScript**: Superset do JavaScript que adiciona tipos estáticos.
- **Prisma**: ORM para manipulação de banco de dados.
- **JWT (JsonWebToken)**: Para autenticação e autorização via token.
- **Helmet**: Melhora a segurança da aplicação Express.
- **Bcrypt-ts**: Biblioteca para hash de senhas.
- **Zod**: Validação de esquemas e dados.

## Instalação

Siga as etapas abaixo para executar o projeto localmente:

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/clonedotwitter.git
    ```

2. Entre no diretório do projeto:

    ```bash
    cd clonedotwitter
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Crie um arquivo `.env` com as variáveis de ambiente necessárias.

5. Execute o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login com JWT.
- **Tweets**: Criar, visualizar e curtir tweets.
- **Usuários**: Gerenciar perfil de usuários, seguir/desseguir usuários.
- **Feed**: Exibir tweets dos usuários seguidos.
- **Tendências**: Ver os tópicos mais comentados.
- **Sugestões de Usuários**: Sugestões de perfis para seguir.

## Endpoints da API

### Autenticação

- `POST /auth/signup` - Cadastro de novo usuário.
- `POST /auth/signin` - Login do usuário.

### Tweets

- `POST /tweet` - Criar novo tweet (autenticado).
- `GET /tweet/:id` - Obter detalhes de um tweet específico.
- `GET /tweet/:id/answers` - Obter respostas de um tweet.
- `POST /tweet/:id/like` - Curtir ou remover curtida de um tweet.

### Usuários

- `GET /user/:slug` - Obter informações de um usuário específico.
- `GET /user/:slug/tweets` - Obter tweets de um usuário.
- `POST /user/:slug/follow` - Seguir ou deixar de seguir um usuário.
- `PUT /user` - Atualizar perfil do usuário.

### Sistema

- `GET /feed` - Obter feed de tweets.
- `GET /search` - Buscar tweets.
- `GET /trending` - Obter tópicos em alta.
- `GET /suggestions` - Obter sugestões de usuários para seguir.

## Licença

Este projeto está sob a licença ISC. Consulte o arquivo `LICENSE` para mais detalhes.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

---

### Exemplo de comando para rodar o servidor:
```bash
npm run dev
