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

  })
  .then( festival => {

    if (festival) {

      models.Media.create({

      })
      .then( media => {

        festival.setMedia( media )
        .then( festival => {
          res.json( { } );
        })
        .catch( err => {
          res.json( { } );
        });
      })
      .catch( err => {

      });

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
router.post('/new/artist', function (req,res) {
  let send = req.body;

  models.Artist.find({

  })
  .then( artist => {

    if (artist) {

      models.Media.create({
        name,url
      })
      .then( media => {

        festival.setMedia( media )
        .then( artist => {
          res.json( { } );
        })
        .catch( err => {
          res.json( { } );
        });
      })
      .catch( err => {

      });

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
router.post('/edit', function (req,res) {
  let send = req.body;

  models.Media.find({

  })
  .then( media => {

    if (media) {
      media.updateAttributes({

      });
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
router.delete('/:mediaID', function (req,res) {
  let send = req.body;

  models.Media.find({

  })
  .then( media => {

    if (media) {

      media.destroy()
      .then( media => {
        res.json( { } );
      })
      .catch( err => {
        res.json( { } );
      });

    }
    else res.json( { } );
    
  })
  .catch( err => { res.json( { } ); });

});
