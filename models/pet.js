const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Pet = sequelize.define("Pet", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.STRING,
  },
  breed: {
    type: DataTypes.STRING,
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

module.exports = Pet;
