'use strict';

import { faker } from '@faker-js/faker';

export default {
  up: async (queryInterface) => {
    const products = [];

    for (let i = 0; i < 20; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price({ min: 10, max: 200 })),
        stock: faker.number.int({ min: 0, max: 100 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        path: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('products', products, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
