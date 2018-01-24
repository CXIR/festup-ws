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
router.post('/new', function (req,res) {
  let send = req.body;

  models.Festival.find({

  })
  .then( festival => {

    if (festival) {

      models.Scene.create({
        name, description
      })
      .then( scene => {

        festival.setScene(scene)
        .then( festival => {
          res.json( { } );
        })
        .catch( err => {
          res.json( { } );
        });

      })
      .catch( err => {
        res.json( { } );
      });

    }
    else res.json( { } );

  })
  .catch( err => {
    res.json( { } );
  });

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

  })
  .then( scene => {

    if (scene) {

      scene.updateAttributes({

      });
      res.json( { } );
    }
    else res.json( { } );

  })
  .catch( err => {
    res.json( { } );
  });

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

  });

  models.Scene.find({

  })
  .then( scene => {

    if (scene) {

      scene.destroy()
      .then( scene => {
        res.json( { } );
      })
      .catch( err => {
        res.json( { } );
      });

    }
    else res.json( { } );

  })
  .catch( err => { 
    res.json( { } );
  });

});
