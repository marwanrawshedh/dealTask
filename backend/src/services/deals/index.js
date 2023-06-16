const { Deal } = require("../../models");
const { Op } = require("sequelize");

const getDeal = async (id) => {
  return await Deal.findOne({
    where: {
      id,
    },
    attributes: ["id", "name", "dateOfBirth", "email", "phone", "status"],
  });
};

const getDeals = async ({ offset, limit, searchTerm }) => {
  return Deal.findAndCountAll({
    subQuery: false,
    where: {
      name: {
        [Op.like]: `%${searchTerm}%`,
      },
    },
    distinct: true,
    offset,
    limit,
  });
};

const createDeal = async (deal) => {
  console.log(deal);
  return await Deal.create(deal);
};

const deleteDeals = async (id) => {
  return await Deal.destroy({ where: { id } });
};

const updateDealStatus = async (id, status) => {
  status = status === "Active" ? "Expired" : "Active";
  const deal = await Deal.findByPk(id, {
    attributes: ["id", "name", "amount", "description", "currency", "status"],
  });
  deal.status = status;
  return await deal.save();
};

module.exports = {
  getDeal,
  getDeals,
  createDeal,
  updateDealStatus,
  deleteDeals,
};
