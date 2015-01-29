"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');
var moment = require('moment');

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

    // Set title.
    $('.financial-widget--data-source').click(function(e){
      setTitle(this.text);
      e.preventDefault();
    });
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]');
    var currentYear = moment().format('YYYY');
    var selected = '';
    for (var i = 0; i < 5; i++) {
      selected = (currentYear == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + currentYear + '"' + selected + '>' + currentYear + '</option>');
      currentYear--;
    }
  }

  function setTitle(value) {
    $('.financial-widget--time h1').text(value);
  }

  init();
};

module.exports = FinancialWidget;
