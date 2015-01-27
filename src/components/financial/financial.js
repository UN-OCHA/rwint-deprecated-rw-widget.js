"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');

var FinancialWidget = function(opts) {
  var config = {
    title: "Financial",
    template: "financial.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

FinancialWidget.prototype = new WidgetBase();

FinancialWidget.prototype.link = function(elements) {

  function init() {
    populateYearSelector();
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]');
    var year = 2015;
    var selected = '';
    for (var i = 0; i < 5; i++) {
      selected = (year == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + year + '"' + selected + '>' + year + '</option>');
      year--;
    }
  }

  init();
};

module.exports = FinancialWidget;
