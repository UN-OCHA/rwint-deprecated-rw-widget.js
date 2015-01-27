"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');
var moment = require('moment');
var reliefweb = require('reliefweb');

var RiverWidget = function(opts) {
  var config = {
    title: "River Widget",
    template: "river.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

RiverWidget.prototype = new WidgetBase();

RiverWidget.prototype.compile = function(elements, next) {
  // TODO: Filter by dates.
  // TODO: Grab this from select.

  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, 'weeks').format();
  var countries = widget.config('countries');
  var preset = {preset: "analysis"};

  var filters = {
    filter: {
      'operator': 'AND',
      'conditions': [
        {
          "field": "date.created",
          "value": {
            "from": fromDate,
            "to": currentDate
          }
        }
      ]
    }
  };

  if (Array.isArray(countries) && countries.length) {
    filters.filter.conditions.push({
      'field': 'country',
      'value': countries,
      'operator': 'OR'
    });
  }

  var rw = reliefweb.client();
  var riverContent = [
    {
      type: "reports",
      title: "REPORTS",
      icon: "un-icon-product_type_report"
    },
    {
      type: "reports",
      title: "MAPS + INFOGRAPHICS",
      icon: "un-icon-activity_deployment",
    },
    {
      type: "jobs",
      title: "JOBS",
      icon: "un-icon-product_type_map"
    }
  ];


  riverContent.forEach(function(val, key){
    rw.post(val.type)
      .send(preset)
      .send(filters)
      .end(function(err, res) {
        riverContent[key].count = res.body.totalCount;
      });
  });

  console.log(riverContent);
  widget.config('content', riverContent);
  console.log(widget.config());

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });

};

RiverWidget.prototype.link = function(elements) {

  var $element = $(elements[0][0]);
  function init() {

    $('select', $element).selectric();

    // Open popup.
    $('.river-widget--dropdown-heading, .close').click(function(){
      $('.river-widget--dropdown--wrapper').toggleClass('open');
    });

    // Close popup.
    $('.river-widget-dropdown--item').click(function(){
      $('.river-widget--dropdown--wrapper').removeClass('open');
    });
  }

  init();
};

module.exports = RiverWidget;
