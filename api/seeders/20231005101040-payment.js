'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('payments', [{
      amount: 3000,
      trx_ref: 'tr_ref_3040',
      status: 'pending',
      membershipPlanId: 1,
      userId:1,
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
    await queryInterface.bulkDelete('payments', null, {});

  }
};
