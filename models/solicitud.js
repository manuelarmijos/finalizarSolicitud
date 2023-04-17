'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  solicitud.init({
    calificacionCliente: DataTypes.INTEGER,
    calificacionConductor: DataTypes.INTEGER,
    comentarioCliente: DataTypes.STRING,
    comentarioConductor: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    idSolicitud: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'solicitud',
  });
  return solicitud;
};