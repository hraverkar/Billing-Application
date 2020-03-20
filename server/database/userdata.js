module.exports = function(sequelize) {
  const Sequelize = require("sequelize");
  var userdataModel = sequelize.define(
    "userdata",
    {
      username: { type: Sequelize.STRING, primaryKey: true },
      password: Sequelize.STRING
    },
    { timestamps: false, freezeTableName: true }
  );
  return userdataModel;
};
