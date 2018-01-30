'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

const Discogs = require('disconnect').Client;

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.get('/one/:artistID', function (req,res) {

  models.Artist.find({
    where : {
              id : req.params.artistID
            },
    include : [
                { model : models.Media,    as : 'Medias',     include : [ models.Type    ] },
                { model : models.Platform, as : 'Plateforms'  include : [ models.Type    ] },                           },
                { model : models.Festival, as : 'Shows',      include : [ models.Address ] }
              ]
  })
  .then( artist => {

    if (artist) res.json(artist.responsify());
    else res.json({ result : -1, message : 'Error' });
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

  models.Artist.findAll({
    include : [
                { model : models.Media,    as : 'Medias',     include : [ models.Type    ] },
                { model : models.Platform, as : 'Plateforms', include : [ models.Type    ] },
                { model : models.Festival, as : 'Shows',      include : [ models.Address ] }
              ]
  })
  .then( artists => {

    if (artists) {
      let results = {};

      for(let artist of artists) results.push(artist.responsify());

      res.json({ result : 1, content : results });
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
router.post('/new', function (req,res) {
  let send = req.body;

  models.Artist.create({
    name        : send.name,
    description : send.description,
    valid       : 1
  })
  .then( artist => {

    if (artist) res.json({ result : 1, content : artist.responsify() });
    else res.json({ result : -1, message : 'Error' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/media', function (req,res) {
  let send = req.body;

  models.Artist.find({
    where : {
              id : send.artist
            }
  })
  .then(artist => {

    if (artist) {

      models.Media.create({
        name : send.name,
        url  : send.url
      })
      .then(media => {

        artist.setMedia(media)
        .then( artist => {
          res.json({result : 1, content : artist.responsify() });
        })
        .catch( err => { res.json({ result : -1, message : 'Error' }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error' }); });
    }
    else res.json({ result : 0, message : 'Error' });
  })
  .catch(err => { res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/platform', function (req,res) {
  let send = req.body;

  models.Artist.find({
    where : {
              id : send.artist
            }
  })
  .then( artist => {

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

            artist.setPlatform(platform)
            .then( artist => {
              res.json({ result : 1, content : artist });
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

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/search', function (req,res) {
  let send = req.body;

  models.Artist.findAll({
    where : {
      [Op.or] : [ { name        : { [Op.like] : send.term } },
                  { description : { [Op.like] : send.term } } ]
    },
    include : [
                { model : models.Media,    as : 'Medias',     include : [ models.Type    ] },
                { model : models.Platform, as : 'Plateforms', include : [ models.Type    ] },
                { model : models.Festival, as : 'Shows',      include : [ models.Address ] }
              ]
  })
  .then( artists => {
    if( artists ){
      let results = {};

      for( let artist of artists ) results.push( artist.responsify() );

      res.json({ result : 1, content : results });
    }
    else res.redirect('/artists/discogs');
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.post('/discogs', function (req,res) {

  let send = req.body;
  let discogs = new Discogs({
	                             consumerKey: 'JPKzAYHSdLxiAJWbXoSv',
	                             consumerSecret: 'aoQwGDDIzrYPghySnDwmZvLemLKSEGOh'
                             });

  let data = discogs.database();

  data.search( send.term )
  .then( artist => {
    res.json(artist);
  })
  .catch( err => { res.json({ result : -1, message : 'Error' }); });

});

module.exports = router;
