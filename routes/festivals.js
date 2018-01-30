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
                { model : models.Media,     as : 'Medias'    },
                { model : models.Scene,     as : 'Scenes'    },
                { model : models.Artist,    as : 'Artists'   },
                { model : models.Platform,  as : 'Platforms' },
                { model : models.Price,     as : 'Prices'    },
                { model : models.Address }
              ]
  })
  .then( festival => {
    if (festival) res.json({ result : 1, content : festival.responsify() });
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/all', function (req,res) {

  models.Festival.findAll({
    include : [
                { model : models.Media,     as : 'Medias'    },
                { model : models.Scene,     as : 'Scenes'    },
                { model : models.Artist,    as : 'Artists'   },
                { model : models.Platform,  as : 'Platforms' },
                { model : models.Price,     as : 'Prices'    },
                { model : models.Address }
              ]
  })
  .then( festivals => {

    if (festivals) {
      let results = {};

      for(let festival of festivals ) results.push(festival.responsify());

      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'Error' });

  })
  .catch( err => { res.json({ result : 0, message : 'Error' }); });

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
    name       : send.address.name,
    additional : send.address.additional,
    street     : send.address.street,
    postal     : send.address.postal,
    city       : send.address.city
  })
  .then( address => {

    if (address) {

      models.Festival.create({
        name        : send.name,
        begin       : send.begin,
        end         : send.end,
        description : send.description,
        information : send.information,
        valid       : 1
      })
      .then( festival => {

        festival.setAddress(address)
        .then( festival => {

          res.json({ result : 1, content : festival });
        })
        .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error'  }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/artist', function (req,res) {
  let send = req.body;

  models.Artist.find({
    where : {
              id : send.artist
            }
  })
  .then( artist => {

    if (artist) {

      models.Festival.find({
        where : {
                  id : send.festival
                }
      })
      .then( festival => {

        festival.setArtist(artist)
        .then( festival => {
          res.json({ result : 1, content : festival });
        })
        .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => { res.json({  result : -1, message : 'Error' }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/platform', function (req,res) {
  let send = req.body;

  models.Festival.find({
    where : {
              id : send.festival
            }
  })
  .then( festival => {

    models.Type.find({
      where : {
                id : send.type
              }
    })
    .then( type => {

      models.Platform.create({
        name : send.name,
        url  : send.url
      })
      .then( platform => {

          platform.setType(type)
          .then( platform => {

            festival.setPlatform(platform)
            .then( festival => {
              res.json({ result : 1, content : festival });
            })
            .catch( err => { res.json({ result : -1, message : 'Error' }); });
          })
          .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    })
    .catch( err => { res.json({ result : -1, message : 'Error' }); });
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

module.exports = router;
