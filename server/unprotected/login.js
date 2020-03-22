module.exports = function(sequelize,config) {
  let loginRouter = require("express").Router();
  var validate = require("../validate");
  let userdata = require("../database/userdata")(sequelize);

  loginRouter.post("/", function(req, res) {
    try {
      if (validate(req.body.username) || validate(req.body.password)) {
        res.send({ message: "Server error authenticating user, try again !!" });
        return;
      }
      userdata
        .findOne({
          where: { username: req.body.username, password: req.body.password },
          logging: false
        })
        .then(function(result) {
          if (result === null) {
            ErrorHandler(
              "Incorrect User Name or password, or user is not authorized !!",
              res,
            );
            return;
          }
          res.send({result, message:"OK"});
        })
        .catch(error =>
          ErrorHandler(
            "Server error authenticating user login, try again !!",
            res,
            error
          )
        );
    } catch (error) {
      loggerFunction.loggerInsert(error, "Error in /login.");
      Cleanup(res);
    }
  });

  function ErrorHandler(userMessage, res, error) {
    res.send({ message: userMessage });
  }

  function Cleanup(res) {
    if (!res.headersSent) { res.send({ message: 'Server error authenticating user login, try again !!' }); }
  }
  return loginRouter;
};
