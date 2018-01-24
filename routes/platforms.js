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
router.get('/', function (req,res) {

  models.Platform.findAll({

  })
  .then( platforms => {

    if (platforms) {
      let results = {};

      for (let in ) results.push();

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
router.post('/new', function (req,res) {
  let send = req.body;

  models.Platform.create({
    name
  })
  .then( platform => {
    res.json( { } );
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

  models.Platform.find({

  })
  .then( platform => {

    if (platform) {

      platform.updateAttributes({

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
router.delete('/:platformID', function (req,res) {

  models.Platform.find({

  })
  .then( platform => {

    if (platform) {

      platform.destroy()
      .then( platform => {
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
