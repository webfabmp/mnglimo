'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Postagens.init({
    titulo: DataTypes.STRING,
    texto: DataTypes.TEXT,
    nomeUsuario: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    local: DataTypes.STRING,
    contato: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Postagens',
  });
  return Postagens;
};