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
router.get('/one/:ID', function (req,res) {

  models.Festival.find({
    where   : {
                id : req.params.ID
              },
    include : [

              ]
  })
  .then( festival => {

  })
  .catch( err => { } );

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/all', function (req,res) {

  models.Festival.findAll({

  })
  .then( festivals => {

    if (festivals) {
      let results = {};

      for(let in ) results.push();

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

  models.Address.create({
    name,additional,street,postal,city
  })
  .then( address => {

    if (address) {

      models.Festival.create({
        name,begin,end,description,information,valid
      })
      .then( festival => {

        festival.setAddress(address);
        res.json( { } );

      })
      .catch( err => { res.json( { } ); });
    }
    else res.json( { } );

  })
  .catch( err => { res.json( { } ); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/artist', function (req,res) {

  models.Artist.find({

  })
  .then( artist => {

    if (artist) {

      models.Festival.find({

      })
      .then( festival => {

        festival.setArtist(artist);
        res.json( { } );
      })
      .catch( err => { res.json( { } ); });
    }
    else res.json( { } );

  })
  .catch( err => { res.json( { } ); });
});
