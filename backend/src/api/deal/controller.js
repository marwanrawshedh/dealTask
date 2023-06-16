const { StatusCodes } = require("http-status-codes");
const { pagination } = require("../../utils");
const { dealsService } = require("../../services");

const getDeal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dealsService.getDeals(id);
    console.log(result);
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getDeals = async (req, res) => {
  const { page, size, searchTerm } = req.query;
  const { limit, offset } = pagination.getPagination({ page, size });
  try {
    const { count, rows } = await dealsService.getDeals({
      limit,
      offset,
      searchTerm,
    });
    const result = pagination.getPagingData(
      { count: count, rows },
      page,
      limit
    );
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const createDeal = async (req, res) => {
  const Deal = req.body;
  console.log(Deal);

  try {
    const data = await dealsService.createDeal(Deal);
    return res.status(StatusCodes.CREATED).send(data);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteDeals = async (req, res) => {
  const { id } = req.params;
  try {
    await dealsService.deleteDeals(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
const updateDeal = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const deal = await dealsService.updateDealStatus(id, status);
    return res.status(StatusCodes.OK).send(deal);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  getDeal,
  getDeals,
  createDeal,
  deleteDeals,
  updateDeal,
};
