'use strict';

/**
* PLATFORM MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Platform = sequelize.define('Platform', {
    id : {
      type          : DataTypes.BIGINT,
      primaryKey    : true,
      autoIncrement : true
    },
    name : {
      type      : DataTypes.STRING,
      allowNull : false
    },
    url : {
      type      : DataTypes.STRING,
      allowNull : false
    }
  });

  /** Class Methods */

  Platform.associate = function (models) {

    Platform.belongsToMany( models.Festival, { through : 'FestivalPlatforms', as : 'Platforms' } );
    Platform.belongsToMany( models.Artist,   { through : 'ArtistPlatforms',   as : 'Artists'   } );

  }

  /** Instance Methods */

  Platform.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.name = this.name;

    return result;
  }

  return Platform;

};
