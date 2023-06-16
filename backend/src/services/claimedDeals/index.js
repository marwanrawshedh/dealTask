const { ClaimedDeal, Deal } = require("../../models");
const { Op } = require("sequelize");

const getClaimedDeals = async (id) => {
  console.log(id);
  return ClaimedDeal.findAndCountAll({
    subQuery: false,
    where: { user_id: id },

    include: [
      {
        model: Deal,
      },
    ],
  });
};

const createClaimedDeal = async (dealId, userId) => {
  console.log(dealId, userId);
  return await ClaimedDeal.create({ deal_id: dealId, user_id: userId });
};

module.exports = {
  getClaimedDeals,
  createClaimedDeal,
};
