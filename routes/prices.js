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
router.post('/new', function (req,res) {
  let send = req.body;

  models.Price.create({
    name,amount
  })
  .then( price => { 
    if (price) {

      models.Festival.find({

      })
      .then( festival => {

        if (festival) {

          festival.setPrice(price)
          .then( festival => { res.json( { } ); })
          .catch( err => { res.json( { } ); });
        }
        else res.json( { } );

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
router.post('/edit', function (req,res) {
  let send = req.body;

  models.Price.find({

  })
  .then( price => {

    if (price) {

      price.updateAttributes({

      });
      res.json( { } );
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
router.delete('/:priceID', function (req,res) {

  models.Price.find({

  })
  .then( price => {

    if (price) {

      price.destroy()
      .then( price => { res.json( { } ); })
      .catch( err => { res.json( { } ); });
    }
    else res.json( { } );
  })
  .catch( err => { res.json( { } ); });

});
