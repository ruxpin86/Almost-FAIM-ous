const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Convos extends Model {}

Convos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // body: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     type: DataTypes.INTEGER,
    //       model: "User",
    //     references: {
    //       key: "id",
    //     },
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Convos",
  }
);

module.exports = Convos;
