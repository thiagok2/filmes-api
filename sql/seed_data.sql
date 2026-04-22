-- Seed data for desenvolvimento
-- Limpa tabelas e insere registros de exemplo para filme, usuario, perfil, comentario, curtida e playlist_filme
-- Rode com psql: psql "postgres://user:pass@host:port/dbname" -f sql/seed_data.sql

BEGIN;

-- Limpa e reinicia sequências
TRUNCATE TABLE comentario, curtida, playlist_filme, perfil, filme, usuario RESTART IDENTITY CASCADE;

-- Usuarios
INSERT INTO usuario (id, uid, email, nome_completo, data_registro, created_at, updated_at)
VALUES
  (1, '6Fawjn3CfjYOHYhPwkG9bc4OMTm2', 'ecs55@aluno.ifal.edu.br', 'Eduardo Caio', '2026-02-04 11:34:35', '2026-02-04 11:34:35', '2026-02-04 11:34:35'),
  (2, 'GmnfS66VMqffAIVAlHYgsgO7oR82', NULL, 'Mãe de Allycia Francyne', '2025-12-03 09:29:09', '2025-12-03 09:29:09', '2025-12-03 09:29:09');

-- Perfis (cada perfil referencia usuario.id)
INSERT INTO perfil (id, usuario_id, nome, imagem_path, data_registro, created_at, updated_at)
VALUES
  (1, 2, 'Mãe de Allycia Francyne', NULL, '2025-12-03 09:29:09', '2025-12-03 09:29:09', '2025-12-03 09:29:09'),
  (2, 1, 'Perfil do Eduardo', NULL, '2026-02-04 11:40:00', '2026-02-04 11:40:00', '2026-02-04 11:40:00');

-- Filmes
INSERT INTO filme (id, titulo, foto_thumbnail, imagem_fundo, data_lancamento, adulto, imdb_id, tipo, has_video, sinopse, genero, elenco, curtidas, nota_avaliacao, created_at, updated_at)
VALUES
  (1, 'Desligue!', 'https://image.tmdb.org/t/p/w500/poster1.jpg', 'https://image.tmdb.org/t/p/original/backdrop1.jpg', '2023-07-15', false, 'tt0123456', 'movie', false, 'Um thriller sul-coreano que ...', 'Thriller,Drama', 'Ator A, Atriz B', 1245, 8.1, NOW(), NOW()),
  (2, 'Outro Filme', NULL, NULL, '2021-05-20', false, 'tt0987654', 'movie', false, 'Filme nacional independente', 'Drama', 'Ator C', 150, 6.4, NOW(), NOW()),
  (3, 'A Jornada Perdida', 'https://image.tmdb.org/t/p/w500/poster3.jpg', NULL, '2019-11-02', false, 'tt2233445', 'movie', false, 'Uma aventura emocionante por terras desconhecidas.', 'Aventura,Drama', 'Ator D, Atriz E', 540, 7.2, NOW(), NOW()),
  (4, 'Noite Silenciosa', 'https://image.tmdb.org/t/p/w500/poster4.jpg', 'https://image.tmdb.org/t/p/original/backdrop4.jpg', '2020-10-31', false, 'tt3344556', 'movie', false, 'Suspense psicológico sobre memórias e perda.', 'Suspense,Thriller', 'Ator F', 320, 7.8, NOW(), NOW()),
  (5, 'Comédia do Bairro', NULL, NULL, '2018-06-12', false, 'tt4455667', 'movie', false, 'Comédia leve sobre vizinhos e confusões.', 'Comédia', 'Ator G, Atriz H', 2100, 6.9, NOW(), NOW()),
  (6, 'Documentário: Mar Profundo', 'https://image.tmdb.org/t/p/w500/poster6.jpg', NULL, '2022-03-05', false, 'tt5566778', 'movie', false, 'Exploração dos oceanos e sua vida marinha.', 'Documentário', 'Narrador X', 95, 8.5, NOW(), NOW()),
  (7, 'Fuga em 60 Segundos', 'https://image.tmdb.org/t/p/w500/poster7.jpg', 'https://image.tmdb.org/t/p/original/backdrop7.jpg', '2015-08-20', false, 'tt6677889', 'movie', true, 'Ação acelerada em ritmo frenético.', 'Ação', 'Ator I', 780, 7.0, NOW(), NOW()),
  (8, 'Romance na Estação', NULL, NULL, '2017-02-14', false, 'tt7788990', 'movie', false, 'História de amor que começa numa estação de trem.', 'Romance,Drama', 'Atriz J', 430, 7.4, NOW(), NOW()),
  (9, 'Animação: Herói Mirim', 'https://image.tmdb.org/t/p/w500/poster9.jpg', NULL, '2024-01-10', false, 'tt8899001', 'movie', false, 'Aventura animada para toda a família.', 'Animação,Família', 'Vozes A', 3050, 8.7, NOW(), NOW()),
  (10, 'Thriller Noturno', NULL, 'https://image.tmdb.org/t/p/original/backdrop10.jpg', '2021-12-01', false, 'tt9900112', 'movie', false, 'Mistério que se desenrola durante uma longa noite.', 'Thriller,Mistério', 'Ator K, Atriz L', 670, 7.6, NOW(), NOW());

-- Comentários
INSERT INTO comentario (id, nota_avaliacao, conteudo, data_avaliacao, filme_id, perfil_id)
VALUES
  (1, 8.0, 'Curti bastante, boa trama e direção.', '2024-03-10', 1, 1),
  (2, 6.5, 'Razoável, esperava mais.', '2024-04-01', 2, 2);

-- Comentários adicionais
INSERT INTO comentario (id, nota_avaliacao, conteudo, data_avaliacao, filme_id, perfil_id)
VALUES
  (3, 9.0, 'Impressionante do início ao fim.', '2024-05-12', 9, 1),
  (4, 7.5, 'Boa comédia, rendeu boas risadas.', '2024-06-01', 5, 2),
  (5, 6.8, 'Alguns furos no roteiro mas entretém.', '2024-07-20', 3, 1),
  (6, 8.2, 'Documentário muito informativo.', '2024-08-15', 6, 2),
  (7, 7.0, 'Ação bem dirigida, vale o ingresso.', '2024-09-02', 7, 1),
  (8, 7.9, 'Romance simples porém tocante.', '2024-10-10', 8, 2);

-- Curtidas
INSERT INTO curtida (id, data_curtida, filme_id, perfil_id)
VALUES
  (1, '2024-03-11', 1, 1),
  (2, '2024-04-02', 2, 2);

-- Curtidas adicionais
INSERT INTO curtida (id, data_curtida, filme_id, perfil_id)
VALUES
  (3, '2024-05-13', 9, 1),
  (4, '2024-06-02', 5, 2),
  (5, '2024-07-21', 3, 1),
  (6, '2024-08-16', 6, 2),
  (7, '2024-09-03', 7, 1),
  (8, '2024-10-11', 8, 2);

-- Playlist (favoritos ou lista do usuário)
INSERT INTO playlist_filme (id, data_adicao, filme_id, perfil_id, assistido)
VALUES
  (1, '2024-03-11', 1, 1, true),
  (2, '2024-04-02', 2, 2, false);

-- Playlist adicionais
INSERT INTO playlist_filme (id, data_adicao, filme_id, perfil_id, assistido)
VALUES
  (3, '2024-05-13', 9, 1, true),
  (4, '2024-06-02', 5, 2, false),
  (5, '2024-07-21', 3, 1, false),
  (6, '2024-08-16', 6, 2, true),
  (7, '2024-09-03', 7, 1, false),
  (8, '2024-10-11', 8, 2, false);

COMMIT;
