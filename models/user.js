'use strict';

const salts = require('../helpers/generateSalts');
const hash = require('../helpers/cryptoHash'); 

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (dataUser) => {
        const secret = salts()
        const createHash = hash(dataUser.password, secret)
        dataUser.password = createHash
        dataUser.salt = secret
      }
    }
  });
  
  return User;
};