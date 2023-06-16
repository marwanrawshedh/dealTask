const { sequelize, DataTypes } = require("./sequelize");
const UserModel = require("./user")(sequelize, DataTypes);
const ClaimedDealModal = require("./claimedDeal")(sequelize, DataTypes);
const DealModel = require("./deal")(sequelize, DataTypes);

const models = {
  User: UserModel,
  Deal: DealModel,
  ClaimedDeal: ClaimedDealModal,
};

Object.keys(models).forEach((modelName) => {
  const model = models[modelName];
  if (model.associate) {
    model.associate(models);
  }
});
sequelize.sync({ alter: true });
module.exports = models;
