'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student_Subject = sequelize.define('Student_Subject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  });
  
  Student_Subject.associate = (models) => {
    Student_Subject.belongsTo(models.Student)
    Student_Subject.belongsTo(models.Subject)
  }
  
  return Student_Subject;
};