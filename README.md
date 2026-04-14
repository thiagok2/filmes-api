# BACKEND - API
    Javascript - NODE

    Rotas HTTP/JSON - lib Express
        GET     /api/filmes
        GET     /api/favoritos
        POST    /api/add-comentarios
    
    Comunicação - JSON
        {
            id: 10,
            titulo: 'Desligue!',
            pais: 'Córeia do Sul',
            produtora: {
                nome: 'universal'
            }
    
        }
    npm (Node Package Manager)
        gerenciador de pacotes

    mysql -bd

    sequelize - ORM(Objetos no banco)   


# FRONTEND
    Javascript
    React
        Comandos para criar:
            1. (create-react-app, npx create-next-app@latest)
    fetch (promises, async/await)
    ```markdown
    # BACKEND - API (Express)

    Este repositório contém um scaffold mínimo para uma API backend usando Node.js e Express.

    Observação rápida sobre ferramentas:
    - npm é um gerenciador de pacotes (e também um executor de scripts) usado em projetos Node.js.
    - Vite é uma ferramenta/empacotador focada em aplicações front-end (dev server rápido, bundling). Vite não substitui o npm — você normalmente usa npm (ou pnpm/yarn) para instalar dependências e executar scripts, e pode usar Vite apenas em projetos frontend.

    Se o seu objetivo é construir uma API backend com Express, use npm (ou outro gerenciador) normalmente. Abaixo está um passo a passo para criar e rodar a API.

    Passo a passo rápido
    1. Inicializar o projeto (gera package.json):

    ```bash
    npm init -y
    ```

    2. Instalar dependências (Express) e uma dependência de desenvolvimento para reload automático (nodemon):

    ```bash
    npm install express
    npm install -D nodemon
    ```

    3. Estrutura mínima de arquivos (já incluída neste repositório):

    - `package.json` - metadados e scripts
    - `src/index.js` - servidor Express mínimo
    - `.gitignore` - ignora `node_modules` e arquivo `.env`

    4. Scripts úteis no `package.json` (exemplos):

    - `npm start` — inicia a API com Node (produção)
    - `npm run dev` — inicia a API com `nodemon` (desenvolvimento, reinicia ao salvar)

    5. Rodar em desenvolvimento:

    ```bash
    npm install   # só da primeira vez
    npm run dev
    ```

    Exemplo de rota disponível (no scaffold):
    - GET / => retorna um JSON simples: { status: 'ok', message: 'Hello from Express API' }

    Próximos passos sugeridos
    - Adicionar rotas em `src/routes` ou controllers conforme a necessidade;
    - Adicionar validação (Joi, Zod) e tratamento de erros centralizado;
    - Se quiser TypeScript, posso converter este scaffold para TypeScript (ts-node, tsc, tipos @types/express).

    Se quiser, eu já criei um scaffold mínimo aqui no workspace e instalei as dependências — veja abaixo como testar localmente.
    ```