module.exports = function(sequelize) {
  const Sequelize = require("sequelize");
  var customerDataModel = sequelize.define(
    "customer",
    {
      customerid: { type: Sequelize.STRING, primaryKey: true },
      customername: Sequelize.STRING,
      customeraddress: Sequelize.STRING,
      customernumber: Sequelize.STRING,
      date: Sequelize.STRING,
    },
    { timestamps: false, freezeTableName: true }
  );
  return customerDataModel;
};
