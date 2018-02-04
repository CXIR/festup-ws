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

    Media.belongsToMany( models.Festival, { through : 'FestivalMedias', foreignKey : 'MediaId', as : 'Festivals' } );
    Media.belongsToMany( models.Artist,   { through : 'ArtistMedias',   foreignKey : 'MediaId', as : 'Artists'   } );

  }

  /** Instance Methods */

  Media.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;
    result.url  = this.url;

    return result;
  }

  return Media;

};
