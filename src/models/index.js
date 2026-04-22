import Filme from './filme.js';
import Usuario from './usuario.js';
import Perfil from './perfil.js';
import Comentario from './comentario.js';
import PlaylistFilme from './playlistFilme.js';
import Curtida from './curtida.js';

// Associations

// Usuario 1..* Perfil
Usuario.hasMany(Perfil, { foreignKey: 'usuario_id', as: 'perfis' });
Perfil.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Perfil 1..* Comentario
Perfil.hasMany(Comentario, { foreignKey: 'perfil_id', as: 'comentarios' });
Comentario.belongsTo(Perfil, { foreignKey: 'perfil_id', as: 'perfil' });

// Filme 1..* Comentario
Filme.hasMany(Comentario, { foreignKey: 'filme_id', as: 'comentarios' });
Comentario.belongsTo(Filme, { foreignKey: 'filme_id', as: 'filme' });

// Playlist (many-to-many via playlist_filme)
Perfil.belongsToMany(Filme, { through: PlaylistFilme, foreignKey: 'perfil_id', otherKey: 'filme_id', as: 'playlist' });
Filme.belongsToMany(Perfil, { through: PlaylistFilme, foreignKey: 'filme_id', otherKey: 'perfil_id', as: 'em_playlists' });

// Curtidas (many-to-many via curtida)
Perfil.belongsToMany(Filme, { through: Curtida, foreignKey: 'perfil_id', otherKey: 'filme_id', as: 'curtidos' });
Filme.belongsToMany(Perfil, { through: Curtida, foreignKey: 'filme_id', otherKey: 'perfil_id', as: 'recebeu_curtidas' });

export {
  Filme,
  Usuario,
  Perfil,
  Comentario,
  PlaylistFilme,
  Curtida
};
