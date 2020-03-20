// call the packages we need
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var app = express();
var morgan = require("morgan");
var cors = require("cors");
const Sequelize = require("sequelize");

var path = require("path");
var _ = require("lodash");
const helmetConfig = require("./helmetConfig");

var sequelize = new Sequelize(config.hostname);
app.use(cors());
app.use(morgan("dev")); // log requests to the console
// configure body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb"
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(helmetConfig());

// Entity Tag as strong key
app.set("etag", "strong");

const dbroutes = require("./databaseRoutes")(
  sequelize,
  config,
  app,
  path,
  Sequelize
);
app.use(dbroutes);

const staticRoutes = require("./staticRoutes")(path, config);
app.use(staticRoutes);

app.disable("x-powered-by");
let currentServer;
var http = require("http");
currentServer = http.createServer(app).listen(config.unsecureport, function() {
  process.send && process.send("ready");
  console.log(config.unsecureport);
});
