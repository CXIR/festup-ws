'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const Discogs = require('disconnect').Client;

const Promise = require('bluebird');

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
                { model : models.Media,    as : 'Medias',    include : [ { model : models.Type    } ] },
                { model : models.Platform, as : 'Platforms', include : [ { model : models.Type    } ] },
                { model : models.Festival, as : 'Festivals', include : [ { model : models.Address } ] }
              ]
  })
  .then( artist => {

    if (artist) res.json(artist.responsify());
    else res.json({ result : 0, message : 'Error' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', err : err }); });

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
                { model : models.Media,    as : 'Medias',    include : [ { model : models.Type    } ] },
                { model : models.Platform, as : 'Platforms', include : [ { model : models.Type    } ] },
                { model : models.Festival, as : 'Festivals', include : [ { model : models.Address } ] }
              ]
  })
  .then( artists => {

    if (artists) {
      let results = [];

      for(let artist of artists) results.push(artist.responsify());

      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'No Artist found' });

  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err  }); });

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
    else res.json({ result : -1, message : 'No Artist found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

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
        .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Artist found' });
  })
  .catch(err => { res.json({ result : -1, message : 'Error', error : err }); });

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
            .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
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
router.post('/search', function (req,res) {
  let send = req.body;

  models.Artist.findAll({
    where : {
              [Op.or] : [ { name        : { [Op.like] : '%' + send.term + '%' } },
                          { description : { [Op.like] : '%' + send.term + '%' } } ]
            },
    include : [
            { model : models.Media,    as : 'Medias',    include : [ { model : models.Type    } ] },
            { model : models.Platform, as : 'Platforms', include : [ { model : models.Type    } ] },
            { model : models.Festival, as : 'Festivals', include : [ { model : models.Address } ] }
          ]
  })
  .then( artists => {

    let results = [];

    for( let artist of artists ) results.push( artist.responsify() );

    if( results.length > 0 ) res.json({ result : 1, location : 'inside', content : results });
    else
    {
      let discogs = new Discogs({
    	                             consumerKey: 'JPKzAYHSdLxiAJWbXoSv',
    	                             consumerSecret: 'aoQwGDDIzrYPghySnDwmZvLemLKSEGOh'
                                 });

      let data = discogs.database();

      data.search( send.term )
      .then( artists => {

        if( artists ) {

          data.getArtist( artists.results[0].id )
          .then( object => {

            let promises = [];

            let creation = models.Artist.create({ name        : object.name,
                                                  description : object.profile })
                                        .then( artist => { return artist; });
            promises.push(creation);

            let profile = models.Media.create({ name : 'main',
                                                url  : object.images[1].uri })
                                      .then( media => { return media; });
            promises.push(profile);

            let urls = object.urls;

            for( let i = 0; i < urls.length; i++ ) {

              if( urls[i].includes('youtube')   ) {
                let youtube = models.Platform.create({ name : 'Youtube',
                                                       url  : urls[i] })
                                              .then( youtube => { return youtube; });
                promises.push(youtube);
              }
              if( urls[i].includes('facebook')  ) {
                let facebook = models.Platform.create({ name : 'Facebook',
                                                        url  : urls[i] })
                                              .then( facebook => { return facebook; });
                promises.push(facebook);
              }
              if( urls[i].includes('instagram') ) {
                let instagram = models.Platform.create({ name : 'Instagram',
                                                         url  : urls[i] })
                                               .then( instagram => { return instagram; });
                promises.push(instagram);
              }
              if( urls[i].includes('wikipedia') ) {
                let wikipedia = models.Platform.create({ name : 'Wikipedia',
                                                         url  : urls[i] })
                                               .then( wikipedia => { return wikipedia; });
                promises.push(wikipedia);
              }
            }

            Promise.all( promises )
            .then( promises => {

              let artist   = promises[0];
              let media    = promises[1];
              let promizes = [];

              let addMedia = artist.addMedia(media)
                                   .then( media => { return media; });
              promizes.push(addMedia);

              for( let i = 2; i < promises.length; i ++ ) {

                let platform    = promises[i];

                let addPlatform = artist.addPlatform(platform)
                                            .then( platform => { return platform; });
                promizes.push(addPlatform);

              }


              Promise.all( promizes )
              .then( promizes => {

                res.redirect( '/artists/one/' + promizes[0][0][0].ArtistId );
              })
              .catch( err => { res.json({ result : -7, message : 'Error', error : err }); });
            })
            .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
          })
          .catch( err => { res.json({ result : -1, message : 'No Discogs Artist found', error : err }); });
        }

      })
      .catch( err => { res.json({ result : -2, message : 'Error', error : err }); });
    }

  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

module.exports = router;
