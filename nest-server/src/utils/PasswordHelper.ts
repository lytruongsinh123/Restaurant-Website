const bcrypt = require('bcrypt');
const saltRounds = 10;
export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};
export const comparePasswordHelper = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
