import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.js';

class Filme extends Model {}

Filme.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  foto_thumbnail: DataTypes.STRING(512),
  imagem_fundo: DataTypes.STRING(512),
  data_lancamento: DataTypes.DATEONLY,
  adulto: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imdb_id: {
    type: DataTypes.STRING(200),
    allowNull: true,
    unique: true
  },
  tipo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'movie'
  },
  has_video: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  sinopse: DataTypes.TEXT,
  genero: DataTypes.STRING(200),
  elenco: DataTypes.STRING(200),
  curtidas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  nota_avaliacao: DataTypes.DECIMAL(3,1)
}, {
  sequelize,
  modelName: 'Filme',
  tableName: 'filme',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Filme;
