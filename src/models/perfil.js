import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class Perfil extends Model {}

Perfil.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  imagem_path: DataTypes.STRING(512),
  data_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Perfil',
  tableName: 'perfil',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Perfil;
