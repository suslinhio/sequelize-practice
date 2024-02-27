'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('heroes_to_superpowers', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hero_id',
        references: {
          model: 'heroes',
          key: 'id'
        }
      },
      superpowerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'superpower_id',
        references: {
          model: 'superpowers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.addConstraint('heroes_to_superpowers', {
      fields: ['hero_id', 'superpower_id'],
      type: 'unique',
      name: 'unique_pair_constraint'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('heroes_to_superpowers');
  }
};
