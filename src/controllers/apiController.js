const User = require("../models/user");
// import connection from "../configs/database";
const { UploadSingleFile } = require("../services/fileService");

const getUsersApi = async (req, res) => {
  // console.log(results);
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserApi = async (req, res) => {
  let { email, name, city } = req.body;
  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserApi = async (req, res) => {
  let { email, name, city, userId } = req.body;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  // console.log(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserApi = async (req, res) => {
  let userId = req.body.userId;
  // console.log(userId);
  let results = await User.deleteOne({
    _id: userId,
  });

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postUploadSingleFile = async (req, res) => {
  console.log("file = ", req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let results = await UploadSingleFile(req.files.image);
  return res.status(200).json({
    EC: 0,
    data: results,
  });
};
const postUploadMutipleFiles = () => {};
module.exports = {
  getUsersApi,
  postCreateUserApi,
  putUpdateUserApi,
  deleteUserApi,
  postUploadSingleFile,
  postUploadMutipleFiles,
};
