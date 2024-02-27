'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      Hero.hasMany(models.HeroImage, {
        foreignKey: 'heroId'
      });
      Hero.belongsToMany(models.Superpower, {
        through: 'heroes_to_superpowers',
        foreignKey: 'heroId'
      });
    }
  }
  Hero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    realName: {
      type: DataTypes.STRING,
      field: 'real_name'
    },
    originDescription: {
      type: DataTypes.TEXT,
      field: 'origin_description'
    },
    catchPhrase: {
      type: DataTypes.STRING,
      field: 'catch_phrase'
    }
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'heroes',
    underscored: true
  });
  return Hero;
};