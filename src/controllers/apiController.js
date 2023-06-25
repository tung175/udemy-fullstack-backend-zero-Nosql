const User = require('../models/user');
// import connection from "../configs/database";
const getUsersApi = async (req, res) => {
  // console.log(results);
  let results = await User.find({});
  
  return res.status(200).json({
    errorCode: 0,
    data: results,
  })
};

const postCreateUserApi = async (req, res) => {
    let { email, name, city } = req.body;
    let user = await User.create({
      email: email,
      name: name,
      city: city
    })
    return res.status(200).json({
        errorCode: 0,
        data: user,
      })
  };

  const putUpdateUserApi = async (req, res) => {
    let { email, name, city, userId } = req.body;
  
    let user = await User.updateOne({_id: userId}, {email: email, name: name, city: city});
    // console.log(req.body);
    return res.status(200).json({
        errorCode: 0,
        data: user,
      })
  };

  const deleteUserApi = async (req, res) => {
    let userId = req.body.userId;
    // console.log(userId);
    let results = await User.deleteOne({
      _id: userId
    });
  
    return res.status(200).json({
        errorCode: 0,
        data: results,
      })
  }
module.exports = {
    getUsersApi, postCreateUserApi, putUpdateUserApi, deleteUserApi

}