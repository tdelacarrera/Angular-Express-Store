import { Sequelize } from 'sequelize';
import { DB_TYPE, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from './config.js';

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_TYPE,
    port: DB_PORT
});
