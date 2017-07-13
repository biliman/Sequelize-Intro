'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Teachers', [{
      first_name: 'Riza',
      last_name: 'Fahmi',
      email: 'riza@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Adhitia',
      last_name: 'Hidayat Saputra',
      email: 'adhitia@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Adhy',
      last_name: 'Wiranata Prasetyo',
      email: 'adhy@hacktiv8.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
    
  }
};
