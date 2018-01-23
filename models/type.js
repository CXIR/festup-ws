'use strict';

/**
* TYPE (MEDIA) MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Type = sequelize.define('Type', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    }
  });

  /** Class Methods */

  Type.associate = function (models) {

  }

  /** Instance Methods */

  Type.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;

    return result;
  }

  return Type;

};
