'use strict';

import { faker } from '@faker-js/faker';

export default {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(`SELECT id FROM users;`);
    const userIds = users[0].map(u => u.id);

    const purchases = [];

    for (let i = 0; i < 10; i++) {
      purchases.push({
        userId: faker.helpers.arrayElement(userIds),
        price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('purchases', purchases, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('purchases', null, {});
  }
};
