import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class Curtida extends Model {}

Curtida.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_curtida: DataTypes.DATEONLY,
  filme_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Curtida',
  tableName: 'curtida',
  timestamps: false
});

export default Curtida;
