const express = require("express");
const apiRouter = express.Router();

const {getUsersApi, postCreateUserApi, putUpdateUserApi, deleteUserApi} = require('../controllers/apiController');

apiRouter.get("/users", getUsersApi);
apiRouter.post("/users", postCreateUserApi);
apiRouter.put("/users", putUpdateUserApi);
apiRouter.delete("/users", deleteUserApi);

module.exports = apiRouter;
