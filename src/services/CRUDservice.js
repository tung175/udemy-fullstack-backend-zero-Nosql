const connection = require("../configs/database");

const getAllUsers = async () => {
  const [results, fields] = await connection.query("SELECT * FROM Users u");
  return results;
};

const getUserById = async (userId) => {
  const [results, fields] = await connection.query(
    `SELECT * FROM Users where id = ?`,
    [userId]
  );

  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

const updateUserById = async (email, name, city, userId) => {
  const [results, fields] = await connection.query(
    `UPDATE Users 
    SET email = ?,name = ? ,City= ?
    WHERE id = ?;`,
    [email, name, city, userId]
  );
  return results;
};

const HandleRemoveUser = async (userId) => {
  const [results, fields] = await connection.query(
    `DELETE FROM Users WHERE id = ?;`,
    [userId]
  );
};
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  HandleRemoveUser,
};
