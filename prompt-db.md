Vamos agora adicionar a camada de persistencia com uso do mysql e sequelize. Vamos fazendo o passo a passo:


1. instalar libs: postgres, sequelize e criar o teste de conexao do index.js.

npm install dotenv express pg pg-hstore sequelize

Arquivo.env criado na raiz do projeto com os valores:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/iflix

# Server port
PORT=3000

# Node environment
NODE_ENV=development
```


2. quero fazer os models com sequelize: filme, comentarios, usuario, perfil, playlist, conforme o todo.sql.