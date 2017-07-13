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
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Fickry',
      last_name: 'Bil Iman',
      email: 'fickry@biliman.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Hari',
      last_name: 'Antara',
      email: 'hari@antara.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Ganang',
      last_name: 'Damawan',
      email: 'ganang@damawan.com',
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
    return queryInterface.bulkDelete('Person', null, {});
    
  }
};
