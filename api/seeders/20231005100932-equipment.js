'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('equipment', [{
      equipmentName: "Sample Equipment",
      brand: "Sample Brand",
      price: 499.99,
      model: "Sample Model",
      status: "Active",
      purchaseDate: "2023-11-04 13:37:59",
      warrantyExpiryDate: "2023-11-04 13:37:59",
      description: "This is a sample gym equipment description.",
      equipmentCategoryId:1,
      createdAt: '2023-11-04 13:37:59',
      updatedAt: '2023-11-04 13:37:59',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('equipment', null, {});

  }
};
