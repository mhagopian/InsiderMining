"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("openmarketpurchases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      filer_id: {
        type: DataTypes.INTEGER
      },
      filer_name: {
        type: DataTypes.STRING
      },
      trans_date: {
        type: DataTypes.DATE
      },
      trans_price: {
        type: DataTypes.DECIMAL
      },
      ownership_type: {
        type: DataTypes.STRING
      },
      relationship: {
        type: DataTypes.STRING
      },
      company_name: {
        type: DataTypes.STRING
      },
      ticker: {
        type: DataTypes.STRING
      },
      is_active: {
        type: DataTypes.INTEGER
      },
      exchange: {
        type: DataTypes.STRING
      },
      dcn: {
        type: DataTypes.STRING
      },
      price_verification: {
        type: DataTypes.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("openmarketpurchases").done(done);
  }
};
