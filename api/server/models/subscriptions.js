'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscriptions = sequelize.define('Subscriptions', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cost: DataTypes.DOUBLE,
    frequency: DataTypes.ENUM("daily", "weekly", "monthly", "annually"),
    lastCharged: DataTypes.DATE
  }, {});
  Subscriptions.associate = function(models) {
    // associations can be defined here
    Subscriptions.belongsTo(models.User)
  };
  return Subscriptions;
};