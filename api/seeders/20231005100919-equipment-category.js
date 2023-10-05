'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('equipment_categories', [{
      name: 'Cardio',
      description:'Test description',
      createdAt: '2023-11-04 13:37:59',
      updatedAt: '2023-11-04 13:37:59',
    },
    {
      name: 'Fitness',
      description:'test description',
      createdAt: '2023-11-04 13:37:59',
      updatedAt: '2023-11-04 13:37:59',
    }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('equipment_categories', null, {});

  }
};
