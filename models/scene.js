'use strict';

/**
* SCENE MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Scene = sequelize.define('Scene', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    description : {
      type : DataTypes.TEXT,
      allowNull : true
    }
  });

  /** Class Methods */

  Scene.associate = function (models) {

  }

  /** Instance Methods */

  Scene.prototype.responsify = function () {
    let result  = {};

    result.id          = this.id;
    result.name        = this.name;
    result.description = this.description;

    return result;
  }

  return Scene;

};
