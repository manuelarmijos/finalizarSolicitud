'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicituds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calificacionCliente: {
        type: Sequelize.INTEGER
      },
      calificacionConductor: {
        type: Sequelize.INTEGER
      },
      comentarioCliente: {
        type: Sequelize.STRING
      },
      comentarioConductor: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.DOUBLE
      },
      idSolicitud: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('solicituds');
  }
};