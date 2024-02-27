const {Hero} = require('../models');

module.exports.createOne = async (req, res, next) => {
    try {
        const {body} = req;
        const createdHero = await Hero.create(body);
        res.status(201).send({data: createdHero});
    } catch(error) {
        next(error);
    }
}

module.exports.updateOne = async (req, res, next) => {
    try {
        
    } catch(error) {
        next(error);
    }
}

module.exports.deleteOne = async (req, res, next) => {
    try {

    } catch(error) {
        next(error);
    }
}