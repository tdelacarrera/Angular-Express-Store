'use strict';

import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

export async function up(queryInterface, Sequelize) {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('password', salt);

    users.push({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: hashPassword,
      role: 'client',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash('admin', salt);

  users.push({
    name: 'admin',
    email: 'admin@example.com',
    password: hashPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await queryInterface.bulkInsert('users', users);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}

