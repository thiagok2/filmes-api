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

// Also expose the through table directly
Filme.hasMany(PlaylistFilme, { foreignKey: 'filme_id', as: 'playlistRows' });
Perfil.hasMany(PlaylistFilme, { foreignKey: 'perfil_id', as: 'playlistRows' });
PlaylistFilme.belongsTo(Filme, { foreignKey: 'filme_id' });
PlaylistFilme.belongsTo(Perfil, { foreignKey: 'perfil_id' });

// Curtidas (many-to-many via curtida)
Perfil.belongsToMany(Filme, { through: Curtida, foreignKey: 'perfil_id', otherKey: 'filme_id', as: 'curtidos' });
Filme.belongsToMany(Perfil, { through: Curtida, foreignKey: 'filme_id', otherKey: 'perfil_id', as: 'recebeu_curtidas' });

// Expose curtida rows directly
Filme.hasMany(Curtida, { foreignKey: 'filme_id', as: 'curtidaRows' });
Perfil.hasMany(Curtida, { foreignKey: 'perfil_id', as: 'curtidaRows' });
Curtida.belongsTo(Filme, { foreignKey: 'filme_id' });
Curtida.belongsTo(Perfil, { foreignKey: 'perfil_id' });

export {
  Filme,
  Usuario,
  Perfil,
  Comentario,
  PlaylistFilme,
  Curtida
};
