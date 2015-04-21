var application_root  = __dirname;
var express           = require('express');
var logger            = require('morgan');
var models            = require('./models');
var bodyParser        = require('body-parser');
var app               = express();
var $ = require('jquery');
var request           = require('request');
var yahooFinance = require('yahoo-finance');

app.use(logger('dev'));
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.get('/data', function(req, res) {
    // yahooFinance.historical({
    //   symbol: 'IBM',
    //   from: '2015/2/20',
    //   to: '2015/4/20',
    //   period: 'd'
    // }, function(err, quotes){
    //   var quote = quotes
    //   res.send(quote)
    // });

  var url= 'http://edgaronline.api.mashery.com/v2/insiders/transactions.json?transactiontypes=Buy&limit=50&offset=0&debug=false&sortby=filerid+asc&appkey=x9387rrqfrurvrrmzsg7h2p3';
  // var fri= 'http://api.yummly.com/v1/api/recipes?_app_id=66a10d93&_app_key=8bfd076a86bb08e4c703da382368127c&allowedIngredient%5B%5D=beef&maxResult=10';
  request( url, function(error, response, body){
    var results = JSON.parse(body);
    var totalrows = results.result.totalrows;
    var length = (results.result.rows[1].values).length
    var filerId = results.result.rows[1].values[1].value;
    var filerName = results.result.rows[1].values[2].value;
    var transDate = results.result.rows[1].values[8].value;
    var transPrice = results.result.rows[1].values[9].value;
    var ownershipType = results.result.rows[1].values[16].value;
    var relationship = results.result.rows[1].values[19].value;
    var companyName = results.result.rows[1].values[21].value;
    var ticker  = results.result.rows[1].values[22].value;
    var isActive = results.result.rows[1].values[30].value;
    var exchange = results.result.rows[1].values[34].value;
    var dcn = results.result.rows[1].values[35].value;
//   res.send('The Length is ' + filerId)
     res.send('FilerId: '+filerId+ ' filerName: '+filerName+' transDate:'+transDate+' transPrice:'+
                transPrice+' ownershipType:'+ownershipType+' relationship:'+relationship +' companyName:'+ companyName+
                ' ticker:'+ticker+ ' isActive:'+isActive+ ' exchange:'+exchange+ ' dcn:'+dcn)
//    res.send(results.matches[1].ingredients)
 });
});

app.listen(process.env.PORT || 9001, function() {
  console.log('Server running on 9001...');

});
