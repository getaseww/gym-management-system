'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('fitness_classes', [{
      className: 'Cardio',
      description: 'Test description',
      startDate: '2023-11-04 13:37:59',
      endDate: '2023-11-04 13:37:59',
      userId:1,
      instructorId:1,
      createdAt:'2023-11-04 13:37:59', 
      updatedAt:'2023-11-04 13:37:59',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('fitness_classes', null, {});

  }
};
