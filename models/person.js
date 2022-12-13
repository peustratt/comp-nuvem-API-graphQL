const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const Pet = require("./pet");

const Person = sequelize.define("Person", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Tables created");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Person;
