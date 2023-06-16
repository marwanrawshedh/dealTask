const jwt = require("jsonwebtoken");
const decodeToken = async (token) => {
  return jwt.verify(token, process.env.SECRET);
};
module.exports = { decodeToken };
