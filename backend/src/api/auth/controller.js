const { StatusCodes } = require("http-status-codes");
const { userService, authService } = require("../../services");
const { auth } = require("../../utils");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await authService.signIn(user, password);
    if (isPasswordValid) {
      const accessToken = await authService.generateToken(user);
      return res.json({ accessToken, message: "Authentication successful" });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
const checkAccess = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id: userId, role } = await auth.decodeToken(authorization);
    if (!userId) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({ auth: true, role, message: "Authentication successful" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  signIn,
  checkAccess,
};
