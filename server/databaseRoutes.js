module.exports = function(sequelize, config, app, Sequelize,fs,path) {
  let databaseRoute = require("express").Router();

  // unprotected route
  let unprotected = require("./unprotected/unprotected")(sequelize, config, fs);
  // protected route
  let protectedRoute = require("./protected/protected")(
    app,
    fs,
    path,
    sequelize,
    config,
    Sequelize
  );

  databaseRoute.use("/unprotected", unprotected);
  databaseRoute.use("/protected", protectedRoute);

  return databaseRoute;
};
