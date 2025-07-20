'use strict';

import { faker } from '@faker-js/faker';

export default {
  up: async (queryInterface) => {
    const purchases = await queryInterface.sequelize.query(`SELECT id FROM purchases;`);
    const products = await queryInterface.sequelize.query(`SELECT id FROM products;`);
    const purchaseIds = purchases[0].map(p => p.id);
    const productIds = products[0].map(p => p.id);

    const purchaseProducts = [];

    for (let i = 0; i < 30; i++) {
      purchaseProducts.push({
        purchaseId: faker.helpers.arrayElement(purchaseIds),
        productId: faker.helpers.arrayElement(productIds),
        quantity: faker.number.int({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('purchase_product', purchaseProducts, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('purchase_product', null, {});
  }
};
