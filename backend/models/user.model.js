import { Model, DataTypes } from "sequelize";
import { sequelize } from '../sequelize.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,     
        primaryKey: true    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client' 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

export { User };
