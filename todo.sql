CREATE TABLE IF NOT EXISTS filme (
    id SERIAL,
    titulo VARCHAR(255) NOT NULL,
    foto_thumbnail VARCHAR(512) DEFAULT NULL,
    imagem_fundo VARCHAR(512) DEFAULT NULL,
    data_lancamento DATE DEFAULT NULL,
    adulto BOOLEAN NOT NULL DEFAULT false,
    imdb_id VARCHAR(200) UNIQUE DEFAULT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'movie',
    has_video BOOLEAN NOT NULL DEFAULT false,
    sinopse TEXT DEFAULT NULL,
    genero VARCHAR(200) DEFAULT NULL,
    elenco VARCHAR(200) DEFAULT NULL,
    curtidas INT DEFAULT 0,
    nota_avaliacao DECIMAL(3,1) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL,
  uid VARCHAR(128)  UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE DEFAULT NULL,
  nome_completo VARCHAR(255) DEFAULT NULL,
  data_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS perfil (
  id SERIAL,
  usuario_id INTEGER NOT NULL,
  nome VARCHAR(255) NOT NULL,
  imagem_path VARCHAR(512) DEFAULT NULL,
  data_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comentario(
    id SERIAL PRIMARY KEY,
    nota_avaliacao DECIMAL(3,1) DEFAULT NULL,
    conteudo TEXT,
    data_avaliacao DATE,
    filme_id INTEGER,
    perfil_id INTEGER,
    FOREIGN KEY(filme_id) REFERENCES filme(id),
    FOREIGN KEY(perfil_id) REFERENCES perfil(id)
);

CREATE TABLE curtida(
    id SERIAL PRIMARY KEY,
    data_curtida DATE,
    filme_id INTEGER,
    perfil_id INTEGER,
    FOREIGN KEY(filme_id) REFERENCES filme(id),
    FOREIGN KEY(perfil_id) REFERENCES perfil(id)
);

CREATE TABLE playlist_filme(
    id SERIAL PRIMARY KEY,
    data_adicao DATE,
    filme_id INTEGER,
    perfil_id INTEGER,
    assistido boolean  NOT NULL DEFAULT false,
    FOREIGN KEY(filme_id) REFERENCES filme(id),
    FOREIGN KEY(perfil_id) REFERENCES perfil(id)
);
