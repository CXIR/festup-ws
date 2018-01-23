'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

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

router.get('/all', function (req,res) {

  models.Festival.findAll({

  })
  .then( festivals => {

  })
  .catch( err => { } );

});

router.post('/new', function (req,res) {

});

router.post('/artist', function (req,res) {

});

router.post('/scene', function (req,res) {

});
