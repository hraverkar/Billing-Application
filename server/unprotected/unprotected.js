module.exports = function (sequelize, config, fs) {
  const unprotectedRouter = require('express').Router();

  // unprotected routes field:
  const login = require('./login')(sequelize, config);
  unprotectedRouter.use('/login', login);

  return unprotectedRouter;
}