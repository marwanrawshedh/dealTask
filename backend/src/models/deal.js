const deal = (sequelize, DataTypes) => {
  const Deal = sequelize.define(
    "Deal",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.STRING,
        defaultValue: "Amount",
      },
      status: {
        type: DataTypes.ENUM("Expired", "Active"),
        defaultValue: "Active",
      },
      currency: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "deal",
      updatedAt: "updated_date",
    }
  );

  Deal.associate = (models) => {
    Deal.hasMany(models.ClaimedDeal, {
      foreignKey: "deal_id",
      targetKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Deal;
};

module.exports = deal;
