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

  models.Platform.findAll({

  })
  .then( platforms => {

    if (platforms) {
      let results = [];

      for( let platform of platforms ) results.push(platform.responsify());

      res.json({ result : 1, content : results });
    }
    else res.json({ result : 0, message : 'No Platform found' });
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

  models.Platform.find({
    where : {
              id : send.platform
            }
  })
  .then( platform => {

    if (platform) {

      platform.updateAttributes({
        name : send.name,
        url  : send.url
      });
      res.json({ result : 1, content : platform });
    }
    else res.json({ result : 0, message : 'No Platform found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

/**
* ROUTE :
* DESCRIPTION :
* PARAMS :
* RESULT :
*/
router.delete('/:platformID', function (req,res) {

  models.Platform.find({
    where : {
              id : req.params.platformID
            }
  })
  .then( platform => {

    if (platform) {

      platform.destroy()
      .then( platform => {
        res.json({ result : 1, message : 'Platform successfully destroyed' });
      })
      .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });
    }
    else res.json({ result : 0, message : 'No Platform found' });
  })
  .catch( err => { res.json({ result : -1, message : 'Error', error : err }); });

});

module.exports = router;
