const express = require('express');
const multer = require('multer');
const Hero = require('../controllers/Hero.controller');
const path = require('path');

const heroRouter = express.Router();

const STATIC_PATH = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`);
    }
});

const upload = multer({storage});

heroRouter.post('/', upload.single('image'), Hero.createOne);
heroRouter.put('/:heroId', upload.single('image'), Hero.updateOne);
heroRouter.get('/:heroId', Hero.getOne);
heroRouter.get('/', Hero.getAll);
heroRouter.delete('/:heroId', Hero.deleteOne);

module.exports = heroRouter;