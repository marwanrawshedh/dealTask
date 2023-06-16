const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signIn = async (user, password) => {
  return await bcrypt.compare(password, user?.password);
};
const generateToken = async ({ id, role, email, name }) => {
  return jwt.sign({ id, role, email, name }, process.env.SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  signIn,
  generateToken,
};
