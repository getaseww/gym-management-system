'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('users', [{
      firstName: 'Get',
      lastName: 'Wale',
      email: 'get@gmail.com',
      phoneNumber: '0930405060',
      password: 'password',
      sex: 'Male',
      roleId:1,
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
    await queryInterface.bulkDelete('users', null, {});

  }
};
