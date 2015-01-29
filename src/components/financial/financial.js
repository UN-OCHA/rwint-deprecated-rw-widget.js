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

FinancialWidget.prototype.compile = function(elements, next) {
  var widget = this;
  var calculatedDataSources = {};

  var dataSources = widget.config('dataSources');

  dataSources.forEach(function(val, key, items) {
    var currentRequirementTotal, pledgesTotal, fundingTotal;
    currentRequirementTotal = pledgesTotal = fundingTotal = 0;

    // Get totals.
    $.each(val.finData, function() {
      currentRequirementTotal += this.current_requirement;
      pledgesTotal += this.pledges;
      fundingTotal += this.funding;
    });

    // Format percentage raised.
    var percentageRaised = (fundingTotal / currentRequirementTotal) * 100;
    percentageRaised = percentageRaised.toFixed(2);

    // Format totals.
    currentRequirementTotal = formatMillionsBillions(currentRequirementTotal);
    pledgesTotal = formatMillionsBillions(pledgesTotal);
    fundingTotal = formatMillionsBillions(fundingTotal);

    calculatedDataSources[val.dataItemTitle] = {
      "currentRequirementTotal": currentRequirementTotal,
      "pledgesTotal": pledgesTotal,
      "fundingTotal": fundingTotal,
      "percentageRaised": percentageRaised
    };
  });

  function formatMillionsBillions(value) {
    var formattedValue = value / 1000000000;
    if ((formattedValue) > 1) {
      formattedValue = formattedValue.toFixed(2) + ' B';
    }
    else {
      formattedValue = value / 1000000;
      formattedValue = formattedValue.toFixed(2) + ' M';
    }
    return formattedValue;
  }

  this.config('calculatedDataSources', calculatedDataSources);

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });
};

FinancialWidget.prototype.link = function(elements) {
  var widget = this;
  var calculatedDataSources = widget.config('calculatedDataSources');

  function init() {
    populateYearSelector();

    // Set first item active and populate the bar.
    $('.financial-widget--data-source-chooser :first-child').toggleClass('active');
    populateBar();

    $('.financial-widget--data-source').click(function(e){
      var selected = this.text;

      // Set the title.
      setTitle(selected);

      // Set data for selected source.
      setBar(selected);

      // Toggle active class.
      $('.financial-widget--data-source').removeClass('active');
      $(this).toggleClass('active');

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

  function populateBar() {
    var first = Object.keys(calculatedDataSources)[0];
    setBar(first);
  }

  function setTitle(value) {
    $('.financial-widget--time h1').text(value);
  }

  function setCovered(funded, percentage) {
    var value = '$' + funded + ' Funded <span class="percent">' + percentage + '% <span>covered</span></span>';

    // Not sure why it adds 20 when using .width().
    // Because of this, I'm manually subtracting 20 from the value.
    $('.financial-widget--percent-funded .covered').width(percentage-20 + '%').html(value);
  }

  function setRequested(value) {
    $('.financial-widget--percent-funded .requested').html('$' + value + ' Requested');
  }

  function setBar(value) {
    var selectedSource = calculatedDataSources[value];
    setCovered(selectedSource.fundingTotal, selectedSource.percentageRaised);
    setRequested(selectedSource.currentRequirementTotal);
  }

  init();
};

module.exports = FinancialWidget;
