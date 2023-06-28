const userModel = require("../models/user.model");

/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint as part of creating the blogpost, add them to this service
 */
const getAllUsers = async () => {
  try {
    return await userModel.getAllUsers();
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserById = async (userId) => {
  try {
    return await userModel.getUserById(userId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const createUser = async (newUser) => {
  try {
    return await userModel.createUser(newUser);
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async () => {
  try {
    return await userModel.updateUser();
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteUser = async () => {
  try {
    return await userModel.deleteUser();
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
