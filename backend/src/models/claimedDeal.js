const claimedDeal = (sequelize, DataTypes) => {
  const ClaimedDeal = sequelize.define(
    "ClaimedDeal",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      tableName: "claimedDeal",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "deal_id"],
        },
      ],
    }
  );
  ClaimedDeal.associate = (models) => {
    ClaimedDeal.belongsTo(models.Deal, {
      foreignKey: "deal_id",
      targetKey: "id",
    });
    ClaimedDeal.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  };

  return ClaimedDeal;
};

module.exports = claimedDeal;
