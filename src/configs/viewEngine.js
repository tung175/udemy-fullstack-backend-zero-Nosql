const path = require("path");
const express = require("express");

const configsViewEngine = (app) => {
  // console.log(path.join('./src', 'public'));
  app.use(express.static(path.join('./src', 'public')));
  // app.use(express.static('./src/public'))
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  // app.set("views", "./src/views")
};

module.exports = configsViewEngine;
