'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
  });
  Users.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Subscriptions);
  };
  return Users;
};