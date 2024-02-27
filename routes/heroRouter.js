const express = require('express');
const Hero = require('../controllers/Hero.controller');

const heroRouter = express.Router();

heroRouter.post('/', Hero.createOne);

module.exports = heroRouter;