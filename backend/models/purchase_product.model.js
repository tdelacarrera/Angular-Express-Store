/*import { Model, DataTypes } from "sequelize";
import { sequelize } from '../sequelize.js';

class PurchaseProduct extends Model {}

PurchaseProduct.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'purchases',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  sequelize,
  modelName: 'PurchaseProduct',
  tableName: 'purchase_product',
  timestamps: false
});

export { PurchaseProduct };
*/