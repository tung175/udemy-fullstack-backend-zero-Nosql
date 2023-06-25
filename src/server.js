require('dotenv').config()
const express = require('express')
const path = require('path')
const configsViewEngine = require('./configs/viewEngine')
const webRouters = require('./routes/web')
const apiRouter = require('./routes/api');
const connection = require('./configs/database');
const mongoose = require('mongoose');
// const connection = require('./configs/database')


const app = express()
const port = process.env.PROT || 8080
const hostname = process.env.HOST_NAME

configsViewEngine(app);
connection();
//configs req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', webRouters);
app.use('/v1/api', apiRouter);


(async() => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    });
  } catch (error) {
    console.log('>>>> check erro:', error);
  }
})()
