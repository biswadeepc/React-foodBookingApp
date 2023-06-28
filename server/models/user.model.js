const pool = require("../config/db");

const getAllUsers = async () => {
  /*
        * put code to call database here
        * this can be either an ORM model or code to call the database through a driver or querybuilder
        * i.e.-
        INSERT INTO blogposts (user_name, blogpost_body)
        VALUES (user, content);
    */
  //  return 1 //just a dummy return as we aren't calling db right now

  try {
    const results = await pool.query(
      "SELECT USER_ID,USER_EMP_ID,USER_NAME,USER_FNAME,USER_LNAME " +
        "FROM orders.USER_HDR ORDER BY USER_FNAME ASC"
    );
    return results.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getUserById = async (userId) => {
  try {
    const id = parseInt(userId);
    await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return results.rows;
  } catch (err) {
    next(err);
  }
};

const createUser = async (params) => {
  try {
    const { empid, email, pass_hash, fname, lname, status, creator } = params;
    const insertQuery =
      "INSERT INTO orders.user_hdr (user_emp_id,user_name, user_psw, user_fname, user_lname, user_status, created_by) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING USER_ID";
    const results = await pool.query(insertQuery, [
      empid,
      email,
      pass_hash,
      fname,
      lname,
      status,
      creator,
    ]);
    return results.rows;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (params) => {
  try {
    const id = parseInt(params.id);
    const { name, email } = params;
    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        return results.rowCount;
      }
    );
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (params) => {
  try {
    const id = parseInt(params.id);
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        return results.rowCount;
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
