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
  var widget = this;
  widget.prepare("weeks");

  var count = 0;
  var rw = reliefweb.client();
  widget.content.forEach(function(val, key){
    widget.filters.filter.conditions.splice(2, 1 );
    var type;
    if (val.type == "maps") {
      type = "reports";
      widget.filters.filter.conditions.push({
        "field": "format.name",
        "value": ["Map", "Infographic"],
        "operator": "OR"
      });
    }
    else {
      type = val.type;
    }

    rw.post(type)
      .send({preset: "analysis"})
      .send(widget.filters)
      .end(function(err, res) {
        if (!err) {
          count++;
          widget.content[key].count = res.body.totalCount;
          if (count == widget.content.length) {
            widget.config('content', widget.content);
            widget.template(function(content) {
              elements
                .classed('rw-widget', true)
                .html(content);

              next();
            });
          }
        }
      });
  });
};

RiverWidget.prototype.link = function(elements, next) {

  var $element = $(elements[0][0]);
  var widget = this;
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

    $('.widget-river--header select', $element).on('selectric-change', function(element) {
      var period = $(this).val();
      widget.prepare(period);

      var count = 0;
      var rw = reliefweb.client();
      widget.content.forEach(function(val, key){
        widget.filters.filter.conditions.splice(2, 1 );
        var type;
        if (val.type == "maps") {
          type = "reports";
          widget.filters.filter.conditions.push({
            "field": "format.name",
            "value": ["Map", "Infographic"],
            "operator": "OR"
          });
        }
        else {
          type = val.type;
        }

        rw.post(type)
          .send({preset: "analysis"})
          .send(widget.filters)
          .end(function(err, res) {
            if (!err) {
              count++;
              widget.content[key].count = res.body.totalCount;
              if (count == widget.content.length) {
                paint(widget.content);
              }
            }
          });
      });
    });
  }

  function paint(updatedContent) {
    $('li.widget-river--results--item .widget-river--results--number').each(function(index) {
      $(this).html(updatedContent[index].count);
    });
  }

  init();
};

RiverWidget.prototype.prepare = function(period) {
  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, period).format();
  var countries = widget.config('countries');

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

  widget.filters = filters;

  widget.content = [
    {
      type: "reports",
      title: "REPORTS",
      icon: "un-icon-product_type_report"
    },
    {
      type: "maps",
      title: "MAPS + INFOGRAPHICS",
      icon: "un-icon-activity_deployment"
    },
    {
      type: "jobs",
      title: "JOBS",
      icon: "un-icon-product_type_map"
    }
  ];
};

function paint() {

}

module.exports = RiverWidget;
