var $ = require('jquery');
var config = require('./config.js');

var CONDITIONS = ['Rough', 'Average', 'Clean', 'Outstanding'];
var API_MILLIS = 300;

var _getStyles = function(vehicleInfo) {
  var deferred = $.Deferred();
  var url = 'https://api.edmunds.com/api/vehicle/v2/' + vehicleInfo.make + '/' + vehicleInfo.model + '/' + vehicleInfo.year + '/styles?fmt=json&api_key=' + config.EDMUNDS_API_KEY
  $.get(url).then(function(response) {
    var styles = [];
    $.each(response.styles, function(index, style) {
      if (!vehicleInfo.trim || style.trim.toLowerCase().indexOf(vehicleInfo.trim.toLowerCase()) != -1) {
        styles.push(style);
      }
    });
    deferred.resolve(styles);
  });
  return deferred.promise();
}

module.exports = {
  getPrices: function(vehicleInfo) {
    var deferred = $.Deferred();
    _getStyles(vehicleInfo).then(function(styles) {
      var millis = 0;
      $.each(styles, function(_, style) {
        $.each(CONDITIONS, function(_, condition) {
          setTimeout(function() {
            var url = 'https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=' + style.id + '&condition=' + condition + '&mileage=' + vehicleInfo.mileage + '&zip=' + config.ZIP + '&fmt=json&api_key=' + config.EDMUNDS_API_KEY;
            $.get(url).then(function(price) {
              var price = {
                trim: style.trim,
                style: style.name,
                condition: condition,
                privateParty: price.tmv.totalWithOptions.usedPrivateParty,
                retail: price.tmv.totalWithOptions.usedTmvRetail
              }
              deferred.notify(price);
            });
          }, millis);
          millis += API_MILLIS;
        });
      });
    });
    return deferred.promise();
  }
}
