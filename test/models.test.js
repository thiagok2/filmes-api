import { expect } from 'chai';

// Configure tests to use sqlite in-memory before importing the app/models
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'sqlite::memory:';

import sequelize from '../src/sequelize.js';
import { Filme, Usuario, Perfil, Comentario, PlaylistFilme, Curtida } from '../src/models/index.js';

describe('Models integration (Sequelize, sqlite in-memory)', function() {
  this.timeout(5000);

  before(async () => {
    // sync all models
    await sequelize.sync({ force: true });
  });

  after(async () => {
    // do not close the shared sequelize instance here to avoid
    // closing the connection used by other test files in the same process
  });

  it('should create usuario and perfil and associate them', async () => {
    const u = await Usuario.create({ uid: 'test-uid-1', email: 'test1@example.com', nome_completo: 'Test User' });
    const p = await Perfil.create({ usuario_id: u.id, nome: 'Perfil Test' });

    expect(u.id).to.be.a('number');
    expect(p.usuario_id).to.equal(u.id);

    const fetchedPerfil = await Perfil.findOne({ where: { id: p.id }, include: [{ model: Usuario, as: 'usuario' }] });
    expect(fetchedPerfil.usuario.uid).to.equal('test-uid-1');
  });

  it('should create filme and comentario and link them', async () => {
    const f = await Filme.create({ titulo: 'Teste Filme', tipo: 'movie' });
    const u = await Usuario.create({ uid: 'test-uid-2', email: 'test2@example.com', nome_completo: 'User 2' });
    const p = await Perfil.create({ usuario_id: u.id, nome: 'Perfil 2' });

    const c = await Comentario.create({ nota_avaliacao: 7.5, conteudo: 'Bom filme', data_avaliacao: '2024-01-01', filme_id: f.id, perfil_id: p.id });

    expect(c.filme_id).to.equal(f.id);
    expect(c.perfil_id).to.equal(p.id);

    const comments = await Comentario.findAll({ where: { filme_id: f.id } });
    expect(comments.length).to.equal(1);
  });

  it('should create curtida and playlist entries', async () => {
    const f = await Filme.create({ titulo: 'Outro Filme', tipo: 'movie' });
    const u = await Usuario.create({ uid: 'test-uid-3', email: 'test3@example.com', nome_completo: 'User 3' });
    const p = await Perfil.create({ usuario_id: u.id, nome: 'Perfil 3' });

    const like = await Curtida.create({ data_curtida: '2024-02-01', filme_id: f.id, perfil_id: p.id });
    const list = await PlaylistFilme.create({ data_adicao: '2024-02-02', filme_id: f.id, perfil_id: p.id, assistido: false });

    expect(like.filme_id).to.equal(f.id);
    expect(list.perfil_id).to.equal(p.id);

    const curtidas = await Curtida.findAll({ where: { perfil_id: p.id } });
    const playlist = await PlaylistFilme.findAll({ where: { perfil_id: p.id } });

    expect(curtidas.length).to.equal(1);
    expect(playlist.length).to.equal(1);
  });

});
