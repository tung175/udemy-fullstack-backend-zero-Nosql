require("dotenv").config();
const express = require("express");
const path = require("path");
const configsViewEngine = require("./configs/viewEngine");
const webRouters = require("./routes/web");
const apiRouter = require("./routes/api");
const fileUpload = require("express-fileupload");

const connection = require("./configs/database");
const { MongoClient } = require("mongodb");
// const connection = require('./configs/database')

const app = express();
const port = process.env.PROT || 8080;
const hostname = process.env.HOST_NAME;

//configs fileupload
// default options
app.use(fileUpload());

configsViewEngine(app);
connection();
//configs req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", webRouters);
app.use("/v1/api", apiRouter);

(async () => {
  try {
    // using mongoose
    await connection();

    //using mongoDB Driver
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // const dbName = process.env.DB_NAME

    // await client.connect();
    // console.log("Connected successfully to server");

    // const db = client.db(dbName);
    // const collection = db.collection("customers");

    // await collection.insertOne({
    //   "name": "kyutung",
    //   address: {
    //     "caption": "hn",
    //     "contruy": "vietnam",
    //   } 
    // })
    
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(">>>> check erro:", error);
  }
})();
