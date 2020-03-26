module.exports = function (app, fs, path, sequelize, config, Sequelize){
  let protectedRouter = require('express').Router();

  // middleware to use all protected routes:
  protectedRouter.use(function (req, res, next) {
    console.log("protected route called");
    next();
  })
  
   // unprotected routes field:
   const customerInfo = require('./customer')(sequelize, config);
   protectedRouter.use('/customer', customerInfo);


  protectedRouter.get('/gstIN', function (req, res) {
    res.send(config.gstIN);
  });

  protectedRouter.get('/pan', function (req, res) {
    res.send(config.pan);
  });

  return protectedRouter;
}