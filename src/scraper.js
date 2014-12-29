var $ = require('jquery');

module.exports = {
  scrapeVehicleInfo: function() {
    var $specTable = $("#specificationsTable");
    var ret = {};
    $specTable.find("tr").each(function(index, row) {
      var $row = $(row);
      var name  = $.trim($row.children('td:nth-child(1)').text()).toLowerCase();
      var value = $.trim($row.children('td:nth-child(2)').text()).toLowerCase();

      name = name.replace(/:$/, '');
      switch (name) {
        case 'mileage':
          value = value.replace(/,/, '');
        value = parseInt(value, 10);
        break;
        case 'year':
          value = parseInt(value, 10);
        break;
      }

      ret[name] = value;
    });
    return ret;
  }
}
