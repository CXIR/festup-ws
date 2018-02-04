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
router.get('/:festivalID', function (req,res) {

  models.Scene.findAll({
    where : {
              festival_id : req.params.festivalID
            }
  })
  .then( scenes => {
    let result = {};

    for( let scene of scenes ) results.push(scene.responsify());

    res.json({ result : 1, content : results });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/new', function (req,res) {
  let send = req.body;

  models.Festival.find({
    where : {
              id : send.festival
            }
  })
  .then( festival => {

    if (festival) {

      models.Scene.create({
        name        : send.name,
        description : send.description
      })
      .then( scene => {

        festival.setScene(scene)
        .then( festival => {

          res.json({ result : 1, content : festival });
        })
        .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Festival found' });
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

  models.Scene.find({
    where : {
              id : send.scene
            }
  })
  .then( scene => {

    if (scene) {

      scene.updateAttributes({
        name        : send.name,
        descriprion : send.description
      });
      res.json({ result : 1, content : scene });
    }
    else res.json({ result : 0, message : 'No Scene found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/:sceneID', function (req,res) {
  let send = req.body;

  models.Timetable.destroy({
    where : {
              scene_id : send.scene
            }
  });

  models.Scene.find({
    where : {
              id : send.scene
            }
  })
  .then( scene => {

    if (scene) {

      scene.destroy()
      .then( scene => {
        res.json({ result : 1, message : 'Scene successfully destroyed' });
      })
      .catch( err => { res.json({ result : 0, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Scene found' });
  })
  .catch( err => { res.json({ result : 0, message : 'Error', error : err }); });

});

module.exports = router;
