"use strict";
module.exports = function(sequelize, DataTypes) {
  var openmarketpurchase = sequelize.define("openmarketpurchase", {
    filer_id: DataTypes.INTEGER,
    filer_name: DataTypes.STRING,
    trans_date: DataTypes.DATE,
    trans_price: DataTypes.DECIMAL,
    ownership_type: DataTypes.STRING,
    relationship: DataTypes.STRING,
    company_name: DataTypes.STRING,
    ticker: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    exchange: DataTypes.STRING,
    dcn: DataTypes.STRING,
    price_verification: DataTypes.BOOLEAN
  }, {
    underscored: true,
    timestamps: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return openmarketpurchase;
};
