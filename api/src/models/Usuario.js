const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("usuario", {
    dni: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    acercaDeMi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehiculo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logueado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    telefono: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    reportado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
