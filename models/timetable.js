'use strict';

/**
* TIMETABLE MODEL
*/

module.exports = function(sequelize, DataTypes) {

  /** Model Definition */

  const Timetable = sequelize.define('Timetable', {
    id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true
    },
    time : {
      type : DataTypes.DATETIME,
      allowNull : true
    }
  });

  /** Class Methods */

  Timetable.associate = function (models) {
    Timetable.belongsTo( models.Festival );
    Timetable.belongsTo( models.Scene    );
    Timetable.belongsTo( models.Artist   );
  }

  /** Instance Methods */

  Timetable.prototype.responsify = function () {
    let result  = {};

    result.id   = this.id;
    result.time = this.time;

    if( this.Festival ) result.festival = this.Festival.responsify();
    if( this.Scene    ) result.scene    = this.Scene.responsify();
    if( this.Artist   ) result.artist   = this.Artist.responsify();

    return result;
  }

  return Timetable;

};
