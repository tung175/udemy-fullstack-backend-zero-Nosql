const connection = require("../configs/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  HandleRemoveUser,
} = require("../services/CRUDservice");
const User = require('../models/user');
// import connection from "../configs/database";
const getHomePage = async (req, res) => {
  // console.log(results);
  let results = await User.find({});
  return res.render("home.ejs", { listUsers: results });
};

const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  // console.log(req.body);

  // const [results, fields] = await connection.query(
  //   `INSERT INTO Users (email, name, city)
  // VALUES (?, ?, ?);`,
  //   [email, name, city]
  // );
  await User.create({
    email: email,
    name: name,
    city: city
  })
  res.send("created user sucsses");
};

const getUpdatePage = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  // let user = await getUserById(userId);
  let user = await User.findById(userId);
  // console.log(userId);
  return res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let { email, name, city, userId } = req.body;

  await User.updateOne({_id: userId},{email: email, name: name, city: city});
  // console.log(req.body);
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  let user = await User.findById(userId);
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  // console.log(userId);
  await User.deleteOne({
    _id: userId
  });

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
