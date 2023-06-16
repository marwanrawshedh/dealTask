import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.REACT_APP_SALT_ROUND, 10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
