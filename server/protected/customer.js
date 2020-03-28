module.exports = function(sequelize) {
  let customerInfoRouter = require("express").Router();
  let customerData = require("../database/customer")(sequelize);
  let itemData = require("../database/item")(sequelize);
  const uuid = require("uuid/v4");

  customerInfoRouter.post("/", function(req, res) {
    try {
      if (req.body.newEntries.length === 0) {
        res.send({
          message:
            "Server error : unable to add customer information, try again !!"
        });
        return;
      }
      var combos = req.body.newEntries;
      userGroupComboAddition(res, combos);
    } catch (errMessage) {
      res.send({
        message: "Error on assigning user group combo !!"
      });
    }
  });

  customerInfoRouter.get("/", function(req, res) {
    try {
      let customerName = req.query.customername;

     // let customerAddress = req.query.customeraddress;

      //let customerNumber = req.query.customernumber;


      //PrepareCustomerNameSearch(customerName, whereClause);
      //PrepareCustomerAddressSearch(customerAddress, whereClause);
      //PrepareCustomerNumberSearch(customerNumber, whereClause);

      sequelQuery(/*whereClause,*/ res, customerName);
    } catch (error) {
      console.log(error, "Error in fetching video/search /videos.");
      common.cacheHeader(res, errMessage);
      res.send(errMessage);
    }
  });

  function sequelQuery(/*whereClause,*/ res, customerName) {
    var insert_query =
      ('SELECT item.itemname, item.itemquantity, item.itemprice, item.totalprice, customer.customername, customer.customeraddress,customer.customernumber FROM public.item ,public.customer WHERE item.customerid=customer.customerid AND item.username= ? AND customer.customername=?');
    sequelize
      .query(insert_query, {
        replacements: ['admin',customerName],
        type: sequelize.QueryTypes.SELECT,
        logging: console.log
      })
      .then(response => {
        res.send(response);
      });
  }

 /* function PrepareCustomerNameSearch(name, whereClause) {
    if (name !== undefined) {
      let lower_column = sequelize.fn("LOWER", sequelize.col("customername"));
      let user_text = name.toLowerCase();
      let option = {
        customername: sequelize.where(lower_column, {
          [Op.like]: "%" + user_text + "%"
        })
      };
      whereClause.push(option);
    }
  }

  function PrepareCustomerAddressSearch(name, whereClause) {
    if (name !== undefined) {
      let lower_column = sequelize.fn(
        "LOWER",
        sequelize.col("customeraddress")
      );
      let user_text = name.toLowerCase();
      let option = {
        customeraddress: sequelize.where(lower_column, {
          [Op.like]: "%" + user_text + "%"
        })
      };
      whereClause.push(option);
    }
  }

  function PrepareCustomerNumberSearch(name, whereClause) {
    if (name !== undefined) {
      let lower_column = sequelize.fn("LOWER", sequelize.col("customernumber"));
      let user_text = name.toLowerCase();
      let option = {
        customernumber: sequelize.where(lower_column, {
          [Op.like]: "%" + user_text + "%"
        })
      };
      whereClause.push(option);
    }
  }
*/
  function userGroupComboAddition(res, combos) {
    let customerId = uuid();
    customerData
      .create({
        customerid: customerId,
        customername: combos[0].customerName,
        customeraddress: combos[0].customerAdd,
        customernumber: combos[0].customerNum,
        date: new Date().toString()
      })
      .then(result => {
        console.log(result);
        let itemId = uuid();
        itemData
          .create({
            itemid: itemId,
            itemname: combos[0].itemName,
            itemquantity: combos[0].itemQuantity,
            itemprice: combos[0].itemPrice,
            totalprice: combos[0].totalPrice,
            customerid: customerId,
            username: "admin"
          })
          .then(result => {
            console.log(result);
            res
              .status(201)
              .send({
                message:
                  "Successfully saved Customer information & bill generated"
              });
          })
          .catch(error => {
            loggerFunction.loggerInsert(
              error,
              "Error inserting user group combo - /userGroupCombo."
            );
            res.send({
              message:
                "Server encountered error while inserting user information"
            });
          });
      });
  }
  return customerInfoRouter;
};
