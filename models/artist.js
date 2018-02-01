'use strict';

/**
* ARTIST MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Artist = sequelize.define('Artist', {
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
    },
    valid : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : 0
    }
  });

  /** Class Methods */

  Artist.associate = function (models) {
    Artist.belongsToMany( models.Festival, { through : 'ArtistFestivals',   as : 'Festivals'  } );
    Artist.belongsToMany( models.Media,    { through : 'ArtistMedias',      as : 'Medias'     } );
    Artist.belongsToMany( models.Platform, { through : 'ArtistPlatforms',   as : 'Platforms'  } );
  }

  /** Instance Methods */

  Artist.prototype.responsify = function () {
    let result  = {};

    result.id          = this.id;
    result.name        = this.name;
    result.description = this.description;

    if( this.Medias )    result.medias    = this.Medias;
    if( this.Platforms ) result.platforms = this.Platforms;
    if( this.Festivals ) result.festivals = this.Festivals;

    return result;
  }

  return Artist;

};
