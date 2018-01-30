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
router.post('/new/festival', function (req,res) {
  let send = req.body;

  models.Festival.find({
    where : {
              id : send.festival
            }
  })
  .then( festival => {

    if (festival) {

      models.Type.find({
        where : {
                  id : send.type
                }
      })
      .then( type => {

        models.Media.create({
          name : send.name,
          url  : send.url
        })
        .then( media => {

          media.setType(type)
          .then( media => {

            festival.setMedia( media )
            .then( festival => {
              res.json({ result : 1, content : festival });
            })
            .catch( err => { res.json({ result : -1, message : 'Error' }); });
          })
          .catch( err => { res.json({ result : -1, message : 'Error' }); });
        })
        .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => {  res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/new/artist', function (req,res) {
  let send = req.body;

  models.Artist.find({
    where : {
              id : send.artist
            }
  })
  .then( artist => {

    if (artist) {

      models.Type.find({
        where : {
                  id : send.type
                }
      })
      .then( type => {

        models.Media.create({
          name : send.name,
          url  : send.url
        })
        .then( media => {

          media.setType(type)
          .then( media => {

            artist.setMedia( media )
            .then( artist => {
              res.json({ result : 1, content : artist });
            })
            .catch( err => { res.json({ result : -1, message : 'Error' }); });
          })
          .catch( err => { res.json({ result : -1, message : 'Error' }); });
        })
        .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => {  res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/edit', function (req,res) {
  let send = req.body;

  models.Media.find({
    where : {
              id : send.media
            }
  })
  .then( media => {

    if (media) {

      media.updateAttributes({
        name : send.name,
        url  : send.url
      });

      res.json({ result : 1, content : media });
    }
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
router.delete('/:mediaID', function (req,res) {

  models.Media.find({
    where : {
              id : req.params.mediaID
            }
  })
  .then( media => {

    if (media) {

      media.destroy()
      .then( media => {

        res.json({ result : 1, content : media.responsify() });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

module.exports = router;
