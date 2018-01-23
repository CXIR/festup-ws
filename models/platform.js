'use strict';

/**
* PLATFORM MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Platform = sequelize.define('Platform', {
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

  Platform.associate = function (models) {
    Platform.belongsTo( models.Media );
  }

  /** Instance Methods */

  Platform.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;

    if( this.Media ) result.media = this.Media.responsify();

    return result;
  }

  return Platform;

};
