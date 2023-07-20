const express = require("express");
const apiRouter = express.Router();

const {
  getUsersApi,
  postCreateUserApi,
  putUpdateUserApi,
  deleteUserApi,
  postUploadSingleFile,
  postUploadMutipleFiles,
} = require("../controllers/apiController");

const {
  postCreateCustomer,
  postArrayCreateCustomer,
  getCustomers,
  putACustomer,
  deleteACustomer,
  deleteCustomers,
} = require("../controllers/customerController");

const {
  postAProject,
  getAllProjects,
  deleteAProject,
  putAProject,
} = require("../controllers/projectController");

const {
  postATask,
  getAllTasks,
  putATask,
  deleteATask,
} = require("../controllers/taskController");
apiRouter.get("/users", getUsersApi);
apiRouter.post("/users", postCreateUserApi);
apiRouter.put("/users", putUpdateUserApi);
apiRouter.delete("/users", deleteUserApi);

apiRouter.post("/file", postUploadSingleFile);
apiRouter.post("/files", postUploadMutipleFiles);

apiRouter.post("/customers", postCreateCustomer);
apiRouter.get("/customers", getCustomers);
apiRouter.put("/customers", putACustomer);
apiRouter.delete("/customers", deleteACustomer);

apiRouter.post("/customers-many", postArrayCreateCustomer);
apiRouter.delete("/customers-many", deleteCustomers);

apiRouter.post("/projects", postAProject);
apiRouter.get("/projects", getAllProjects);
apiRouter.put("/projects", putAProject);
apiRouter.delete("/projects", deleteAProject);

apiRouter.post("/tasks", postATask);
apiRouter.get("/tasks", getAllTasks);
apiRouter.put("/tasks", putATask);
apiRouter.delete("/tasks", deleteATask);

apiRouter.get("/info", (req, res) => {
  console.log(req.query);
  return res.status(200).json({
    data: req.query,
  });
});

// apiRouter.get('/info/:name/:city', (req, res) => {
//     console.log(req.params);
//     return res.status(200).json({
//         data: req.params
//     })
// })

module.exports = apiRouter;
