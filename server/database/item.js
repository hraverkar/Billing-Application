module.exports = function(sequelize) {
  const Sequelize = require("sequelize");
  var itemModel = sequelize.define(
    "item",
    {
      itemid: { type: Sequelize.STRING, primaryKey: true },
      itemname: Sequelize.STRING,
      itemquantity: Sequelize.STRING,
      itemprice: Sequelize.STRING,
      totalprice: Sequelize.STRING,
      customerid: Sequelize.STRING,
      username: Sequelize.STRING
    },
    { timestamps: false, freezeTableName: true }
  );
  return itemModel;
};
