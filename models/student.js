'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email format is incorrect, please check your email address input, OK?"
        }
        // ,
        // isUnique: function(value, next) {
        //   Student.findAndCountAll({
        //     where: {
        //       email: value
        //     }
        //   })
        //   .then(email => {
        //     if (email.count > 0) {
        //       return next('Email already exist')
        //     }
        //   })
        //   .catch(err => {
        //     next(err)
        //   })
        // }        
      }
    }
  });
  
  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
      through: 'Student_Subject'
    })
  }
  
  return Student;
};