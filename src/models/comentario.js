import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class Comentario extends Model {}

Comentario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nota_avaliacao: DataTypes.DECIMAL(3,1),
  conteudo: DataTypes.TEXT,
  data_avaliacao: DataTypes.DATEONLY,
  filme_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Comentario',
  tableName: 'comentario',
  timestamps: false
});

export default Comentario;
