const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers");

router.get("/users", getAllUsers); // GET on the endpoint /users (list all users)
router.get("/users/:id", getUserById); // GET on the endpoint /users/:userId (get a specific user)
router.post("/users", createUser); // POST on the endpoint /users (create a new user)
router.put("/users/:id", updateUser); // PUT on the endpoint /users/:userId (update the data for a specific user)
router.delete("/users/:id", deleteUser); // DELETE on the endpoint /users/:userId (remove a specific user)

module.exports = router;
