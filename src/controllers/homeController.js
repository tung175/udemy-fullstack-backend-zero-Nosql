const connection = require("../configs/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  HandleRemoveUser,
} = require("../services/CRUDservice");
// import connection from "../configs/database";
const getHomePage = async (req, res) => {
  // console.log(results);
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};

const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  // console.log(req.body);

  const [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city)
  VALUES (?, ?, ?);`,
    [email, name, city]
  );
  res.send("created user sucsses");
};

const getUpdatePage = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  let user = await getUserById(userId);
  // console.log(userId);
  return res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let { email, name, city, userId } = req.body;

  await updateUserById(email, name, city, userId);
  // console.log(req.body);
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  let user = await getUserById(userId);
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  // console.log(userId);
  await HandleRemoveUser(userId);
  res.redirect("/");
}
module.exports = {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser
};
