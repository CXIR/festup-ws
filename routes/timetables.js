'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/:artistID', function (req,res) {

  models.Timetable.findAll({
    where : {
              artist_id : req.params.artistID
            },
    include : [
                { model : models.Festival, include : [ models.Address ] },
                { model : models.Scene    },
                { model : models.Artist, include : [ { model : models.Media }, { model : models.Platform } ] }
              ]
  })
  .then( timetables => {
    let results = [];

    for( let timetable of timetables ) results.push(timetable.responsify());

    res.json({ result : 1, content : results });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/:sceneID', function (req,res) {

  models.Timetable.findAll({
    where : {
              scene_id : req.params.sceneID
            }
  })
  .then( timetables => {
      let results = [];

      for( let timetable of timetables ) results.push(timetable.responsify());

      res.json({ result : 1, content : results });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/:festivalID', function (req,res) {

  models.Timetable.findAll({
    where : {
              festival_id : req.params.festivalID
            }
  })
  .then( timetables => {
      let results = [];

      for( let timetable of timetables ) results.push(timetable.responsify());

      res.json({ result : 1, content : results });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/new', function (req,res) {
  let send = req.body;

  models.Artist.find({
    where : {
              id : send.artist
            }
  })
  .then( artist => {

    models.Festival.find({
      where : {
                id : send.festival
              }
    })
    .then( festival => {

      models.Scene.find({
        where : {
                  id : send.scene
                }
      })
      .then( scene => {

        models.Timetable.create({
          time : send.time
        })
        .then( timetable => {

          timetable.setFestival(festival)
          .then( timetable => {

            timetable.setArtist(artist)
            .then( timetable => {

              timetable.setScene(scene)
              .then( timetable => {
                res.json({ result : 1, content : timetable });
              })
              .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
            })
            .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
          })
          .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
        })
        .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    })
    .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/edit', function (req,res) {
  let send = req.body;

  models.Timetable.find({
    where : {
              id : send.timetable
            }
  })
  .then( timetable => {

    if( timetable ) {

      timetable.updateAttributes({
        time : send.time
      });
      res.json({ result : 1, content : timetable });
    }
    else res.json({ result : 0, message : ' No Timetable found' });
  })
  .catch( err => { res.json({ result : 0, message : ' Error', error : err }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.delete('/:timetableID', function (req,res) {
  let send = req.body;

  models.Timetable.find({
    where : {
              id : send.timetable
            }
  })
  .then( timetable => {

    timetable.destroy()
    .then( timetable => {
      res.json({ result : 1, message : 'Timetable successfully destroyed' });
    })
    .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

module.exports = router;
