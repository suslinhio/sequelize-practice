const {Hero, HeroImage, Superpower} = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createOne = async (req, res, next) => {
    try {
        const {body, file: {filename}, body: {powers}} = req;
        const createdHero = await Hero.create(body);
        if (filename) {
            await createdHero.createHeroImage({imagePath: filename});
        }
        if (powers) {
            await createdHero.addSuperpowers(powers);
        }
        res.status(201).send({data: createdHero});
    } catch(error) {
        next(error);
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const heroInstance = await Hero.findByPk({
            where: {
                id: Number(heroId)
            },
            include: [{
                model: HeroImage
            }, {
                model: Superpower
            }]
        });
        if (heroInstance) {
            res.status(200).send({data: heroInstance});
        } else {
            throw new NotFoundError('Hero not found');
        }
    } catch(error) {
        next(error);
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const {query: {limit, offset}} = req;
        const heroInstances = await Hero.findAll({
            include: [{
                model: HeroImage
            }, {
                model: Superpower
            }],
            limit: Number(limit),
            offset: Number(offset)  
        });
        if (heroInstances) {
            res.status(200).send({data: heroInstances});
        } else {
            throw new NotFoundError('Heroes not found');
        }
    } catch(error) {
        next(error);
    }
}

module.exports.updateOne = async (req, res, next) => {
    try {
        const {body, body: {powers}, file:{filename}, params:{heroId}} = req;
        const heroInstance = await Hero.findByPk(Number(heroId));
        if (heroInstance) {
            const updatedHero = await heroInstance.update(body);
            if (filename) {
                const updatedImage = await HeroImage.create({imagePath: filename});
                updatedHero.addHeroImage(updatedImage);
            }
            if (powers) {
                updatedHero.addSuperpower(powers);
            }
            res.status(200).send({data: updatedHero});
        } else {
            throw new NotFoundError('Hero not found');
        }
    } catch(error) {
        next(error);
    }
}

module.exports.deleteOne = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const heroInstance = await Hero.findByPk(Number(heroId));
        if (heroInstance) {
            const deletedHero = await heroInstance.destroy();
            res.status(200).send({data: deletedHero});
        } else {
            throw new NotFoundError('Hero not found');
        }
    } catch(error) {
        next(error);
    }
}