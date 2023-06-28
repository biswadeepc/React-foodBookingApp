const { userService } = require("../services");

const getAllUsers = async (req, res, next) => {
  try {
    const userData = await userService.getAllUsers();
    res.status(201).send({
      status: "OK",
      data: userData,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const getUserById = async (req, res, next) => {
  const { user, content } = req.body;
  try {
    await userService.getAllUsers();
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.sendStatus(201);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

const createUser = async (req, res, next) => {
  const { body } = req;
  // *** ADD ***
  if (
    !body.empid ||
    !body.email ||
    !body.pass_hash ||
    !body.fname ||
    !body.lname ||
    !body.status ||
    !body.creator
  ) {
    return;
  }
  // *** ADD ***
  const newUser = {
    empid: body.empid,
    email: body.email,
    pass_hash: body.pass_hash,
    fname: body.fname,
    lname: body.lname,
    status: body.status,
    creator: body.creator,
  };
  // *** ADD ***
  const createdUser = await userService.createUser(newUser);
  // *** ADD ***
  res.status(201).send({ status: "OK", data: createdUser });
};

const updateUser = (req, res, next) => {
  res.send("Update an existing workout");
};

const deleteUser = (req, res, next) => {
  res.send("Delete an existing workout");
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
