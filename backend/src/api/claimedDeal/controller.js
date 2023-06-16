const { StatusCodes } = require("http-status-codes");
const { claimedDealsService } = require("../../services");
const { auth } = require("../../utils");

const getClaimedDeals = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const { id } = await auth.decodeToken(authorization);
    const { count, rows } = await claimedDealsService.getClaimedDeals(id);

    return res.status(StatusCodes.OK).send({ count, rows });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
const createClaimedDeal = async (req, res) => {
  const { id: dealId } = req.params;
  const { authorization } = req.headers;

  try {
    const { id: userId } = await auth.decodeToken(authorization);
    const data = await claimedDealsService.createClaimedDeal(dealId, userId);
    return res.status(StatusCodes.CREATED).send(data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createClaimedDeal,
  getClaimedDeals,
};
