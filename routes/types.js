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

  models.Type.findAll({

  })
  .then( types => {
    let results = [];

    for( let type of types ) results.push(type.responsify());

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

  models.Type.create({
    name : send.name
  })
  .then( type => {
    res.json({ result : 1, content : type });
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

  models.Type.find({
    where : {
              id : send.type
            }
  })
  .then( type => {
     type.updateAttributes({
       name : send.name
     });
     res.json({ result : 1, content : type });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.delete('/:typeID', function (req,res) {

  models.Type.find({
    where : {
              id : req.params.typeID
            }
  })
  .then( type => {

    type.destroy()
    .then( type => {
      res.json({ result : 1, message : 'Type successfully destroyed' });
    })
    .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
});

module.exports = router;
