'use strict';

/**
* MEDIA MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Media = sequelize.define('Media', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : true
    },
    url : {
      type : DataTypes.TEXT,
      allowNull : false
    }
  });

  /** Class Methods */

  Media.associate = function (models) {
    Media.belongsTo( models.Type );
  }

  /** Instance Methods */

  Media.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;
    result.url  = this.url;

    if( this.Type ) result.type = this.Type.responsify();

    return result;
  }

  return Media;

};
