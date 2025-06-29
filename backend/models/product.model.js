import { Model, DataTypes } from "sequelize";
import { sequelize } from '../sequelize.js';

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,     
        primaryKey: true    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

export { Product };
