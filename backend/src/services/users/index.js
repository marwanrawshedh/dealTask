const { User } = require("../../models");
const { Op } = require("sequelize");
const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
      status: "Active",
    },
    attributes: [
      "id",
      "name",
      "dateOfBirth",
      "email",
      "phone",
      "status",
      "password",
      "role",
    ],
  });
};

const getUsers = async ({ offset, limit, searchTerm = "", role = "User" }) => {
  return await User.findAndCountAll({
    attributes: [
      "id",
      "name",
      "dateOfBirth",
      "email",
      "phone",
      "status",
      "gender",
    ],

    subQuery: false,
    where: {
      name: {
        [Op.like]: `%${searchTerm}%`,
      },
      role,
    },
    distinct: true,
    offset,
    limit,
  });
};

const createUser = async (user) => {
  const data = await User.create(user);
  const userData = data.get({ plain: true });
  return { ...userData, password: null };
};

const deleteUser = async (usersIds) => {
  console.log(usersIds);
  return await User.destroy({ where: { id: usersIds } });
};

const updateUserStatus = async (id, status) => {
  status = status === "Active" ? "Inactive" : "Active";
  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "dateOfBirth",
      "email",
      "phone",
      "status",
      "gender",
    ],
  });
  user.status = status;
  return await user.save();
};
module.exports = {
  getUserByEmail,
  getUsers,
  createUser,
  updateUserStatus,
  deleteUser,
  getUserByEmail,
};
