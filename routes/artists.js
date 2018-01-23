'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

router.get('/one/:ID', function (req,res) {

  models.Artist.find({

  })
  .then( artist => {

  })
  .catch( err => { } );

});

router.get('/all', function (req,res) {

  models.Artist.findAll({

  })
  .then( artists => {

  })
  .catch( err => { } );

});


router.post('/new', function (req,res) {

});

router.post('/media', function (req,res) {

});

router.post('/platform', function (req,res) {

});

//TODO: Discogs implementation
router.post('/search', function (req,res) {
  let send = req.body;

  models.Artist.findAll({

  })
  .then( artists => {
    if( artists ){

    }
    else res.redirect('/artists/discogs',send);
  })
  .catch( err => { } );

});

router.post('/discogs', function (req,res) {
  let send = req.body;

});
