//console.log('fired off');
//var application_root  = __dirname;
//var express           = require('express');
var request           = require('request');
var logger            = require('morgan');
var models            = require('./models');
var Openmarketpurchase = models.openmarketpurchase;
//var bodyParser        = require('body-parser');
//var app               = express();
var yahooFinance = require('yahoo-finance');


var seedDatabase = function() {
  var offset = 0;
  var returnedRows = 50;
  var url= 'http://edgaronline.api.mashery.com/v2/insiders/transactions.json?transactiontypes=Buy&limit=' + returnedRows + '&offset=' + offset + '&debug=false&sortby=filerid+asc&appkey=x9387rrqfrurvrrmzsg7h2p3';
  request( url, function(error, response, body){
    var results = JSON.parse(body);
    var totalrows = results.result.totalrows;
    var length = (results.result.rows).length;
    for(var i=0; i<length; i++) {
      var filerId = results.result.rows[i].values[1].value;
      var filerName = results.result.rows[i].values[2].value;
      var transDate = results.result.rows[i].values[8].value;
      var transPrice = results.result.rows[i].values[9].value;
      var ownershipType = results.result.rows[i].values[16].value;
      var relationship = results.result.rows[i].values[19].value;
      var companyName = results.result.rows[i].values[21].value;
      var ticker  = results.result.rows[i].values[22].value;
      var isActive = results.result.rows[i].values[30].value;
      var exchange = results.result.rows[i].values[34].value;
      var dcn = results.result.rows[i].values[35].value;
      var priceVerification = false
//       var priceVerification = function() {
// //        this is for verification of the purchase price on day - people -
// //        unfortunately yahoo data isn't 100% accurate either
//           if(isActive == 1){
//             yahooFinance.historical({
//               symbol: ticker,
//               from: transDate,
//               to: transDate,
//               period: d,
//             }, function(err, quotes) {
//               var low = quotes.low
//               var high = quotes.high
//               if (low <= transPrice && high >= transPrice) {
//                 return true
//               }else
//                 return false
//           });
//         }else
//         return false
//       }.then(function() {
        Openmarketpurchase.create({
          filer_id: filerId,
          filer_name: filerName,
          trans_date: transDate,
          trans_price: transPrice,
          ownership_type: ownershipType,
          relationship: relationship,
          company_name: companyName,
          ticker: ticker,
          is_active: isActive,
          exchange: exchange,
          dcn: dcn,
          price_verification: priceVerification
        });
      }
    });
};



console.log('Not sure what is breaking');
Openmarketpurchase.destroy({ truncate: true }).then(function() {
  // var offset = 0;
  // var returnedRows = 5000;
  seedDatabase();
});
