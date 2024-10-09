# 🐦 Clone do Twitter (X)

Este projeto é um **Clone do Twitter (atualmente chamado de X)**, criado com o objetivo de replicar algumas das funcionalidades principais da plataforma original, como a criação de tweets, curtidas, seguidores, feed de notícias, busca de tweets, e muito mais. 🚀

## 🛠️ Tecnologias Utilizadas

As principais tecnologias e ferramentas usadas no desenvolvimento deste projeto são:

- ⚡ **Node.js**: Ambiente de execução do JavaScript no backend.
- 🌐 **Express.js**: Framework web minimalista para Node.js.
- 📜 **TypeScript**: Superset de JavaScript que adiciona tipos estáticos.
- 🗃️ **Prisma**: ORM para interação com o banco de dados.
- 🔐 **JWT (JsonWebToken)**: Para autenticação e autorização de usuários via tokens.
- 🛡️ **Helmet**: Proteger a aplicação com cabeçalhos de segurança.
- 🔑 **Bcrypt-ts**: Para criptografar senhas de forma segura.
- 🧪 **Zod**: Validação de esquemas e tipos de dados.

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/clonedotwitter.git
    ```

2. Acesse o diretório do projeto:

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

## 🚀 Funcionalidades

- 📝 **Autenticação de Usuários**: Crie uma conta e faça login usando JWT.
- 🐦 **Tweets**: Poste, visualize e curta tweets.
- 👤 **Gestão de Usuários**: Veja perfis de usuários, siga e deixe de seguir outros usuários.
- 📰 **Feed de Notícias**: Veja tweets dos usuários que você segue.
- 📈 **Trending Topics**: Descubra os tópicos mais comentados.
- 🔍 **Busca**: Encontre tweets e perfis de usuários.
- 💡 **Sugestões de Seguimento**: Receba sugestões de perfis interessantes para seguir.

## 📑 Endpoints da API

### 🔐 Autenticação

- `POST /auth/signup` - Cadastro de novo usuário.
- `POST /auth/signin` - Login de usuário existente.

### 🐦 Tweets

- `POST /tweet` - Criar novo tweet (autenticado).
- `GET /tweet/:id` - Obter detalhes de um tweet específico.
- `GET /tweet/:id/answers` - Obter respostas de um tweet.
- `POST /tweet/:id/like` - Curtir ou remover curtida de um tweet.

### 👤 Usuários

- `GET /user/:slug` - Obter informações de um usuário específico.
- `GET /user/:slug/tweets` - Obter os tweets de um usuário.
- `POST /user/:slug/follow` - Seguir ou deixar de seguir um usuário.
- `PUT /user` - Atualizar o perfil do usuário.

### 📲 Sistema

- `GET /feed` - Obter o feed de tweets dos usuários seguidos.
- `GET /search` - Buscar tweets e perfis.
- `GET /trending` - Obter os tópicos mais comentados.
- `GET /suggestions` - Receber sugestões de perfis para seguir.

## 📄 Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir **issues** e enviar **pull requests** com melhorias, correções de bugs ou novas funcionalidades. Vamos juntos melhorar este projeto! 💡

---

💻 **Rodando o servidor em modo de desenvolvimento:**

```bash
npm run dev
