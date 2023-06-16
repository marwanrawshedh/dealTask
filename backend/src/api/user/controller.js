const { StatusCodes } = require("http-status-codes");
const { pagination } = require("../../utils");
const { userService } = require("../../services");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.getUser(id);
    console.log(result);
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getUsers = async (req, res) => {
  const { page, size, searchTerm, role } = req.query;
  const { limit, offset } = pagination.getPagination({ page, size });
  try {
    const { count, rows } = await userService.getUsers({
      limit,
      offset,
      searchTerm,
      role,
    });
    const result = pagination.getPagingData(
      { count: count, rows },
      page,
      limit
    );
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  try {
    const data = await userService.createUser(user);
    return res.status(StatusCodes.CREATED).send(data);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { usersIds } = req.body;
  try {
    await userService.deleteUser(usersIds);
    return res.status(StatusCodes.NO_CONTENT).send("deleted");
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await userService.updateUserStatus(id, status);
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
