import { expect } from 'chai';

// Ensure tests run against sqlite in-memory
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'sqlite::memory:';

import sequelize from '../src/sequelize.js';
import { Filme, Usuario, Perfil, Comentario, PlaylistFilme, Curtida } from '../src/models/index.js';

describe('Models relationships: curtidas and playlist through tables', function() {
  this.timeout(5000);

  before(async () => {
    await sequelize.sync({ force: true });
  });

  after(async () => {
    // do not close sequelize here — keep the in-memory DB available
    // throughout the whole test run (Mocha runs multiple files in the same process)
  });

  it('creates a curtida and the perfil.getCurtidos returns the film with through attribute', async () => {
    const u = await Usuario.create({ uid: 'u-curt-1', email: 'curt1@example.com', nome_completo: 'Curtidor' });
    const p = await Perfil.create({ usuario_id: u.id, nome: 'Perfil Curtidor' });
    const f = await Filme.create({ titulo: 'Filme Curtido', tipo: 'movie' });

    // create a curtida row directly
    const dataCurtida = '2024-02-14';
    await Curtida.create({ data_curtida: dataCurtida, filme_id: f.id, perfil_id: p.id });

    // fetch curtidos via association and include through attributes
    const curtidos = await p.getCurtidos({ joinTableAttributes: ['data_curtida'] });
    expect(curtidos).to.be.an('array').with.lengthOf(1);
    expect(curtidos[0].id).to.equal(f.id);
    // through object should be available as 'Curtida'
    expect(curtidos[0].Curtida).to.exist;
    // depending on sqlite storage the date may be string; compare string form
    expect(String(curtidos[0].Curtida.data_curtida)).to.include('2024');
  });

  it('creates playlist entries and perfil.getPlaylist returns films with data_adicao and assistido', async () => {
    const u = await Usuario.create({ uid: 'u-play-1', email: 'play1@example.com', nome_completo: 'Play User' });
    const p = await Perfil.create({ usuario_id: u.id, nome: 'Perfil Player' });
    const f1 = await Filme.create({ titulo: 'Filme na Lista 1', tipo: 'movie' });
    const f2 = await Filme.create({ titulo: 'Filme na Lista 2', tipo: 'movie' });

    // create playlist entries
    await PlaylistFilme.create({ data_adicao: '2024-03-01', filme_id: f1.id, perfil_id: p.id, assistido: true });
    await PlaylistFilme.create({ data_adicao: '2024-03-02', filme_id: f2.id, perfil_id: p.id, assistido: false });

    // fetch playlist via association and request through attributes
    const playlist = await p.getPlaylist({ joinTableAttributes: ['data_adicao', 'assistido'] });
    expect(playlist).to.be.an('array').with.lengthOf(2);

    // Each returned film should have PlaylistFilme through-object
    const found = playlist.find(it => it.id === f1.id);
    expect(found).to.exist;
    expect(found.PlaylistFilme).to.exist;
    expect(String(found.PlaylistFilme.data_adicao)).to.include('2024');
    // sqlite stores booleans as 0/1; accept either 1 or true
    expect([1, true]).to.include(found.PlaylistFilme.assistido);
  });

});
