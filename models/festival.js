'use strict';

/**
* FESTIVAL MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Festival = sequelize.define('Festival', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    begin : {
      type : DataTypes.DATETIME,
      allowNull : false
    },
    end : {
      type : DataTypes.DATETIME,
      allowNull : false
    },
    description : {
      type : DataTypes.TEXT,
      allowNull : false
    },
    information : {
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

  Festival.associate = function (models) {
    Festival.belongsToMany( models.Media,    { through : 'FestivalMedias',    foreignKey : 'FestivalId', as : 'Medias'    } );
    Festival.belongsToMany( models.Artist,   { through : 'ArtistFestivals',   foreignKey : 'FestivalId', as : 'Artists'   } );
    Festival.belongsToMany( models.Scene,    { through : 'FestivalScenes',    foreignKey : 'FestivalId', as : 'Scenes'    } );
    Festival.belongsToMany( models.Platform, { through : 'FestivalPlatforms', foreignKey : 'FestivalId', as : 'Platforms' } );
    Festival.belongsToMany( models.Price,    { through : 'FestivalPrices',    foreignKey : 'FestivalId', as : 'Prices'    } );

    Festival.belongsTo( models.Address );
  }

  /** Instance Methods */

  Festival.prototype.responsify = function () {
    let result  = {};

    result.id          = this.id;
    result.name        = this.name;
    result.begin       = this.begin;
    result.end         = this.end;
    result.description = this.description;
    result.information = this.information;

    if( this.Medias    ) result.medias    = this.Medias;
    if( this.Scenes    ) result.scenes    = this.Scenes;
    if( this.Artists   ) result.artists   = this.Artists;
    if( this.Platforms ) result.platforms = this.Platforms;
    if( this.Prices    ) result.prices    = this.Prices;

    if( this.Address ) result.address = this.Address.responsify();

    return result;
  }

  return Festival;

};
