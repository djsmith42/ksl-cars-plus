console.log('----- KSL Cars Plus extension -----');

var edmunds = require('./edmunds.js');
var scraper = require('./scraper.js');
var display = require('./display.js');
var $ = require('jquery');

var vehicleInfo = scraper.scrapeVehicleInfo();

console.log("[KSL Cars Plus] Vehicle Info:", vehicleInfo);

var priceModel = {};

edmunds.getPrices(vehicleInfo).then(function() {
  // TODO Indicate we are done?
}, function() {
  // TODO Handle error?
}, function(price) {
  if (!priceModel[price.style]) {
    priceModel[price.style] = {};
  }
  if (!priceModel[price.style][price.condition]) {
    priceModel[price.style][price.condition] = {};
  }
  priceModel[price.style][price.condition] = price;

  var html = display.makeHtml(priceModel);

  $('#ksl-cars-plus').remove();
  $("#widgetSpecifications").before(html);
});

module.exports = {}
