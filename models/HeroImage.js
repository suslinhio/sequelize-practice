'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroImage extends Model {
    static associate(models) {
      HeroImage.belongsTo(models.Hero, {
        foreignKey: 'heroId'
      });
    }
  }
  HeroImage.init({
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_path',
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'HeroImage',
    tableName: 'hero_images',
    underscored: true
  });
  return HeroImage;
};