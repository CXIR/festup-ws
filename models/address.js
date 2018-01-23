'use strict';

/**
* ADDRESS MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Address = sequelize.define('Address', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name  : {
      type : DataTypes.TEXT,
      allowNull : true
    },
    additional : {
      type : DataTypes.TEXT,
      allowNull : true
    },
    street : {
      type : DataTypes.STRING,
      allowNull : false
    },
    postal : {
      type : DataTypes.STRING,
      allowNull : false
    },
    city   : {
      type : DataTypes.STRING,
      allowNull : false
    }
  });

  /** Class Methods */

  Address.associate = function (models) {

  }

  /** Instance Methods */

  Address.prototype.responsify = function () {
    let result  = {};

    result.id         = this.id;
    result.name       = this.name;
    result.additional = this.additional;
    result.street     = this.street;
    result.postal     = this.postal;
    result.city       = this.city;

    return result;
  }

  return Address;

};
