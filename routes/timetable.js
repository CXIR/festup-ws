'use strict';

const express = require('express');
const router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

router.get('/:artistID', function (req,res) {

});

router.get('/:sceneID', function (req,res) {

});

router.post('/new', function (req,res) {
  let send = req.body;

});

router.post('/edit', function (req,res) {
  let send = req.body;

});

router.delete('/:timetableID', function (req,res) {
  let send = req.body;

});
