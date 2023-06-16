const { Sequelize, DataTypes } = require("sequelize");
const { databases } = require("../config");

const { mysql } = databases;
const { database, username, password } = mysql;
const sequelize = new Sequelize(database, username, password, { ...mysql });

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = { sequelize, DataTypes };
