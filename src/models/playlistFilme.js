import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';

class PlaylistFilme extends Model {}

PlaylistFilme.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_adicao: DataTypes.DATEONLY,
  filme_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assistido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'PlaylistFilme',
  tableName: 'playlist_filme',
  timestamps: false
});

export default PlaylistFilme;
