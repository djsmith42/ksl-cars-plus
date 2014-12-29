console.log('----- KSL Cars Plus extension -----');

var edmunds = require('./edmunds.js');
var scraper = require('./scraper.js');

var vehicleInfo = scraper.scrapeVehicleInfo();

console.log("[KSL Cars Plus] Vehicle Info:", vehicleInfo);

edmunds.getStyles(vehicleInfo).then(function(styles) {
  edmunds.getValues(vehicleInfo, styles).then(function(stylesWithPrices) {
    console.log("stylesWithPrices:", stylesWithPrices);
  });
});

module.exports = {}
