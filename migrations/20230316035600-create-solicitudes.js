'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      callePrincipal: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calleSecundaria: {
        type: Sequelize.STRING,
        allowNull: true
      },
      costo: {
        type: Sequelize.DOUBLE(16, 2),
        allowNull: true
      },
      idCliente: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      idConductor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      estado: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      calificacion: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
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
    await queryInterface.dropTable('solicitudes');
  }
};