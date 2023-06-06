# ProjectTest

ProjectTest é um projeto de backend construído com diversas tecnologias. Ele fornece um conjunto de APIs para gerenciamento de usuários. Abaixo, você encontrará informações sobre as rotas disponíveis, pré-requisitos e um tutorial sobre como executar o projeto. Nele tentei abordar um padrão de projeto baseados em arquitetura limpa (Clean Architecture), aplicando alguns princípios do SOLID como: Single Responsability e Dependency Inversion.
A aplicação também conta com um front end que está feito em vuejs uma única pagína para demonstar as funcionalidades do backend por meio de uma interface gráfica, logo abaixo haverá um tutorial do necessário para rodar o front-end

## Rotas Disponíveis

1. **GET** - `/user`: Obter uma lista de todos os usuários.
2. **POST** - `/user`: Criar um novo usuário.
3. **PATCH** - `/user/:id`: Atualizar um usuário existente por ID.
4. **DELETE** - `/user/:id`: Excluir um usuário por ID.
5. **GET** - `/user/:id`: Obter um usuário por ID.
6. **GET** - `/docs`: Acessar a documentação do projeto.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter os seguintes pré-requisitos instalados:

- Versão do Node.js: 18.12.1
- Versão do npm: 8.19.2

Além disso, você precisa configurar um arquivo `.env` com as seguintes variáveis de ambiente:

- `PORT`: A porta na qual a aplicação será executada (padrão: 3000).
- `DB_TYPE`: O tipo de banco de dados ('memory' ou 'document') a ser utilizado (padrão: memory).

## Começando - Backend

Para começar com o projeto, siga estas etapas:

1. Instale as dependências executando o seguinte comando:

   ```shell
   npm install
2. Execute os testes do projeto para validar as funcionalidades:
    ```shell
    npm test
3. Execute o servidor para testar o funcionamento das rotas utilizando um http client ou a pagina desenvolvida.
    ```shell
    npm run dev
## Começando - Frontend

**Observação**: O front-end foi configurado para fazer as requisições no backend considerando a porta 3000, caso no momento em que executou o backend certifique-se de que ele está rodando na porta 3000 (Por default ele já foi projetado para rodar na porta 3000, só mudará de porta caso o .env específique outra porta).

Para começar com o projeto, siga estas etapas:

1. Instale as dependências executando o seguinte comando:

   ```shell
   npm install
2. Execute o servidor para testar o funcionamento das rotas utilizando um http client ou a pagina desenvolvida.
    ```shell
    npm run dev
3. Acesse o seu navegador através da seguinte URL para acessar o frontend: http://localhost:5173/
## Tecnologias Utilizadas

As seguintes tecnologias e bibliotecas foram utilizadas neste projeto:

- Express (versão 4.18.2)
- Koa (versão 2.13.0)
- Koa Router (versão 9.4.0)
- Koa CORS (versão 4.0.0)
- Koa Bodyparser (versão 4.4.0)
- Koa2 Swagger UI (versão 5.8.0)
- TypeORM (versão 0.3.16)
- SQLite3 (versão 5.1.6)
- dotenv (versão 16.1.3)
- yamljs (versão 0.3.0)
- Mocha (versão 8.1.3)
- Chai: (versão 4.2.0)

## Contato

Para qualquer dúvida ou sugestão relacionada a este projeto, entre em contato com Jhonatas Matheus em jmdevbr@gmail.com.
