var $ = require('jquery');
var accounting = require('accounting');

var _money = function(x) {
  return accounting.formatMoney(x, "$", 0);
}

module.exports = {
  makeHtml: function(priceModel) {
    var isDealer = $('#widgetDealer').height() > 0;
    var html = 
      "<div id='ksl-cars-plus'>" +
      "<style>" +
      "  #ksl-cars-plus table td.price { text-align: right }" +
      "  #ksl-cars-plus table th.condition { text-align: right; width: 80px; }" +
      "  #ksl-cars-plus table td.trim { background-color: #f1f1f1 }" +
      "  #ksl-cars-plus table tr.highlight td { font-weight: bold }" +
      "</style>" +
      "<h2>Edmunds Prices for this car</h2>" +
      "<table>" +
      "<tr>" +
      "  <th>Style</th>" +
      "  <th class='condition'>Rough</th>" +
      "  <th class='condition'>Average</th>" +
      "  <th class='condition'>Clean</th>" +
      "  <th class='condition'>Outstanding</th>" +
      "</tr>";
    $.each(priceModel, function(style, conditions) {
      html += "<tr>";
      html += "  <td colspan='5' class='trim'>" + style + "</td>";
      html += "</tr>";
      html += "<tr class='" + (isDealer ? 'highlight' : '') + "'>";
      html += "  <td>  &nbsp;&nbsp; Retail:</td>";
      html += "  <td class='price'>" + (conditions.Rough       ? _money(conditions.Rough.retail)        : '') + "</td>";
      html += "  <td class='price'>" + (conditions.Average     ? _money(conditions.Average.retail)      : '') + "</td>";
      html += "  <td class='price'>" + (conditions.Clean       ? _money(conditions.Clean.retail)        : '')+ "</td>";
      html += "  <td class='price'>" + (conditions.Outstanding ? _money(conditions.Outstanding.retail)  : '') + "</td>";
      html += "</tr>";
      html += "<tr class='" + (!isDealer ? 'highlight' : '') + "'>";
      html += "  <td>  &nbsp;&nbsp; Private Party:</td>";
      html += "  <td class='price'>" + (conditions.Rough       ? _money(conditions.Rough.privateParty)        : '') + "</td>";
      html += "  <td class='price'>" + (conditions.Average     ? _money(conditions.Average.privateParty)      : '') + "</td>";
      html += "  <td class='price'>" + (conditions.Clean       ? _money(conditions.Clean.privateParty)        : '')+ "</td>";
      html += "  <td class='price'>" + (conditions.Outstanding ? _money(conditions.Outstanding.privateParty)  : '') + "</td>";
      html += "</tr>";
    });
    html += "</table>";
    return html;
  }
}
