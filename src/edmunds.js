var $ = require('jquery');
var config = require('./config.js');

module.exports = {
  getStyles: function(vehicleInfo) {
    var deferred = $.Deferred();
    var url = 'https://api.edmunds.com/api/vehicle/v2/' + vehicleInfo.make + '/' + vehicleInfo.model + '/' + vehicleInfo.year + '/styles?fmt=json&api_key=' + config.EDMUNDS_API_KEY
    var promise = $.get(url).then(function(response) {
      var styles = [];
      $.each(response.styles, function(index, style) {
        if (!vehicleInfo.trim || style.name.toLowerCase().indexOf(vehicleInfo.trim.toLowerCase()) != -1) {
          styles.push(style);
        }
      });
      deferred.resolve(styles);
    });
    return deferred.promise();
  },
  getValues: function(vehicleInfo, styles) {
    var deferred = $.Deferred();
    var promises = [];
    $.each(styles, function(index, style) {
      var url = 'https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=' + style.id + '&condition=Clean&mileage=' + vehicleInfo.mileage + '&zip=84095&fmt=json&api_key=' + config.EDMUNDS_API_KEY;
      var promise = $.get(url);
      promises.push(promise);
      promise.styleIdHack = style.id;
    });
    $.when.apply($, promises).then(function() {
      var responses = arguments;
      var stylesWithPrices = [];
      $.each(responses, function(index, response) {
        var styleIdHack = response[2].styleIdHack;
        var tmv = response[0].tmv;
        var price = {
          privateParty: tmv.totalWithOptions.usedPrivateParty,
          retail:       tmv.totalWithOptions.usedTmvRetail,
          tradeIn:      tmv.totalWithOptions.usedTradeIn
        }
        $.each(styles, function(index, style) {
          if (style.id == styleIdHack) {
            style.price = price;
            stylesWithPrices.push(style);
          }
        });
      });
      deferred.resolve(stylesWithPrices);
    });
    return deferred.promise();
  }
}
