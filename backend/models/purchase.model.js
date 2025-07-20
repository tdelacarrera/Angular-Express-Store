/*import { Model, DataTypes } from "sequelize";
import { sequelize } from '../sequelize.js';

class Purchase extends Model {}

Purchase.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Purchase',
  tableName: 'purchases',
  timestamps: false
});

export { Purchase };
*/

