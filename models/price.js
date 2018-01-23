'use strict';

/**
* PRICE MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Price = sequelize.define('Price', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    amount : {
      type : DataTypes.FLOAT,
      allowNull : false
    }
  });

  /** Class Methods */

  Price.associate = function (models) {

  }

  /** Instance Methods */

  Price.prototype.responsify = function () {
    let result  = {};

    result.id     = this.id;
    result.name   = this.name;
    result.amount = this.amount;

    return result;
  }

  return Price;

};
