import request from 'supertest';
import { expect } from 'chai';
import app, { sequelize } from '../src/index.js';

// Integration tests for API endpoints
// These tests use the in-memory sqlite DB when NODE_ENV=test (configured in src/sequelize.js)

describe('API integration tests', function () {
  this.timeout(5000);

  before(async () => {
    // ensure fresh schema
    await sequelize.sync({ force: true });
  });

  after(async () => {
    // close connection after all tests
  });

  it('GET / should return status ok', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'ok');
  });

  it('CRUD: create and list filmes', async () => {
    // create a filme
    const createRes = await request(app)
      .post('/api/filmes')
      .send({ titulo: 'IT Test Movie', tipo: 'movie' });

    expect(createRes.status).to.equal(201);
    expect(createRes.body).to.have.property('titulo', 'IT Test Movie');

    // list filmes
    const listRes = await request(app).get('/api/filmes');
    expect(listRes.status).to.equal(200);
    expect(listRes.body).to.be.an('array');
    expect(listRes.body.length).to.be.greaterThan(0);
  });

  it('should create usuario and perfil, then curtir a um filme', async () => {
    // create user
    const userRes = await request(app)
      .post('/api/usuarios')
      .send({ uid: 'it-user-1', email: 'it@example.com', nome_completo: 'IT User' });
    expect(userRes.status).to.equal(201);
    const userId = userRes.body.id;

    // create perfil
    const perfilRes = await request(app)
      .post('/api/perfis')
      .send({ usuario_id: userId, nome: 'Perfil IT' });
    expect(perfilRes.status).to.equal(201);
    const perfilId = perfilRes.body.id;

    // create filme to like
    const filmeRes = await request(app)
      .post('/api/filmes')
      .send({ titulo: 'Likeable Movie', tipo: 'movie' });
    expect(filmeRes.status).to.equal(201);
    const filmeId = filmeRes.body.id;

    // curtir
    const likeRes = await request(app)
      .post(`/api/filmes/${filmeId}/curtir`)
      .send({ perfil_id: perfilId });
    expect(likeRes.status).to.equal(201);
    expect(likeRes.body).to.have.property('perfil_id', perfilId);
  });

  it('should add comentario and favorito (playlist) for a perfil', async () => {
    // create user
    const userRes = await request(app)
      .post('/api/usuarios')
      .send({ uid: 'it-user-2', email: 'it2@example.com', nome_completo: 'IT User 2' });
    const userId = userRes.body.id;

    const perfilRes = await request(app)
      .post('/api/perfis')
      .send({ usuario_id: userId, nome: 'Perfil IT2' });
    const perfilId = perfilRes.body.id;

    const filmeRes = await request(app)
      .post('/api/filmes')
      .send({ titulo: 'Comentable Movie', tipo: 'movie' });
    const filmeId = filmeRes.body.id;

    // comentario
    const commentRes = await request(app)
      .post('/api/comentarios')
      .send({ conteudo: 'Ótimo!', nota_avaliacao: 8, data_avaliacao: '2024-04-01', filme_id: filmeId, perfil_id: perfilId });
    expect(commentRes.status).to.equal(201);
    expect(commentRes.body).to.have.property('conteudo');

    // favorito (playlist)
    const favRes = await request(app)
      .post('/api/favoritos')
      .send({ filme_id: filmeId, perfil_id: perfilId, data_adicao: '2024-04-10', assistido: false });
    expect(favRes.status).to.equal(201);
    expect(favRes.body).to.have.property('filme_id', filmeId);
  });
});
