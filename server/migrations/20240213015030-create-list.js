'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Profiles",
          key: "id"
        }
      },
      mangaId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coverId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.TEXT('2000'),
        defaultValue: "-"
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 5
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lists');
  }
};