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
router.get('/:festivalID', function (req,res) {

  models.Price.findAll({
    where : {
              festival_id : req.params.festivalID
            }
  })
  .then( prices => {
    let result = {};

    for( let price of prices ) results.push(price.responsify());

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

  models.Festival.find({
    where : {
              id : send.festival
            }
  })
  .then( festival => {

    models.Price.create({
      name   : send.name,
      amount : send.amount
    })
    .then( price => {

      festival.setPrice(price)
      .then( festival => {
        res.json({ result : 1, content : festival });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
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
router.post('/edit', function (req,res) {
  let send = req.body;

  models.Price.find({
    where : {
              id : send.price
            }
  })
  .then( price => {

    if (price) {

      price.updateAttributes({
          name   : send.name,
          amount : send.amount
      });
      res.json({ result : 1, content : price});
    }
    else res.json({ result : 0, message : 'No Price found' });
  })
  .catch( err => { res.json({ result : 0, message : 'Error', error : err }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.delete('/:priceID', function (req,res) {

  models.Price.find({
    where : {
              id : req.params.priceID
            }
  })
  .then( price => {

    if (price) {

      price.destroy()
      .then( price => {
        res.json({ result : 1, message : 'Price successfully destroyed' });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Price found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

module.exports = router;
