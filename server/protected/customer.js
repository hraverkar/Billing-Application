module.exports = function(sequelize) {
  let customerInfoRouter = require("express").Router();
  let customerData = require("../database/customer")(sequelize);
  let itemData = require("../database/item")(sequelize);
  //const uuid = require('uuid/v4');

  customerInfoRouter.post("/", function(req, res) {
    try {
      if (req.body.newEntries.length === 0) {
        res.send({
          message:
            "Server error : unable to add customer information, try again !!"
        });
        return;
      }
      var combos = JSON.parse(req.body.newEntries);
      userGroupComboAddition(res, combos);
    } catch (errMessage) {
      res.send({
        message: "Error on assigning user group combo !!"
      });
    }
  });

  customerInfoRouter.get("/", function(req, res) {});

  function userGroupComboAddition(res, combos) {
    customerData
      .create(
        {
          customerid: combos[0].customerid,
          customername: combos[0].customername,
          customeraddress: combos[0].customeraddress,
          customernumber: combos[0].customernumber,
          date: new Date().toString()
        },
        { logging: console.log }
      )
      .then(result => {
        console.log(result);
        itemData
          .create(
            {
              itemid: combos[0].itemid,
              itemname: combos[0].itemname,
              itemquantity: combos[0].itemquantity,
              itemprice: combos[0].itemprice,
              totalprice: combos[0].totalprice,
              customerid: combos[0].customerid,
              username: combos[0].username
            },
            { logging: console.log }
          )
          .then((result) => {
            console.log(result);
            res
              .status(201)
              .send({ message: "Successfully saved user group combo" });
          })
          .catch(error => {
            loggerFunction.loggerInsert(
              error,
              "Error inserting user group combo - /userGroupCombo."
            );
            res.send({
              message:
                "Server encountered error while inserting user group combo"
            });
          });
      });
  }
  return customerInfoRouter;
};
