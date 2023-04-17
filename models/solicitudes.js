'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitudes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  solicitudes.init({
    callePrincipal: {
      allowNull: true,
      type: DataTypes.STRING
    },
    calleSecundaria: {
      allowNull: true,
      type: DataTypes.STRING
    },
    costo: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    idCliente: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    idConductor: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    estado: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    calificacion: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'solicitudes',
  });
  return solicitudes;
};