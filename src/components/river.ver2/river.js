"use strict";

var _ = require('lodash');
var WidgetBase = require('beat-blocks').helpers.widgetBase;
var $ = require('jquery');
var moment = require('moment');
var reliefweb = require('reliefweb');
var d3 = require('d3');
var Handlebars = require('handlebars');

// load templates
require('./river.hbs.js');
require('./river-item.hbs.js');

var RiverWidget = function(opts) {
  var config = {
    title: "More From Reliefweb",
    template: "river.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

RiverWidget.prototype = new WidgetBase();

RiverWidget.prototype.compile = function(elements, next) {
  var widget = this;

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });

  function titleAdjust(title) {
    var snippet = '<span class="word[[counter]]">[[word]]</span>';
    var words = title.split(' ');
    var adjustedTitle = '';

    adjustedTitle = snippet.replace('[[counter]]', 1).replace('[[word]]', words.shift());
    adjustedTitle += snippet.replace('[[counter]]', 2).replace('[[word]]', words.join(' '));

    return adjustedTitle;
  }
};

RiverWidget.prototype.link = function(elements, next) {

  var $element = $(elements[0][0]);
  var widget = this;
  var content = widget.config('content');
  var rw = reliefweb.client();

  function init() {
    paint();
  }


  function paint(updatedContent) {
    rw.post('reports')
      .send({'limit': 4})
      .send({
        'fields': {
          'include': ["title", "source", "date"]
        }
      })
      .sort('date.created', 'desc')
      .end(function(err, res) {
        if (!err) {
          var data = _.map(res.body.data, function(n) {
            return {
              item_date: moment(n.fields.date.created, moment.ISO_8601).format('DD MMMM YYYY'),
              item_title: n.fields.title,
              item_source: n.fields.source[0].name
            };
          });

          var items = _.reduce(data, function(acc, value) {
            return acc + Handlebars.templates['river-item.hbs'](value);
          }, '');

          $('.filters-content--item').empty().html(items);
        }
      });
  }

  init();
};

RiverWidget.prototype.getData = function(period, updatePage) {
  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, period).format();
  var countries = widget.config('countries');
  var content = widget.config('content');

  var interval = "day";
  if (period == "years") {
    interval = "month";
  }

  widget.config('timePeriod', {
    duration: period,
    startDate: moment(fromDate, moment.ISO_8601).utc().format("MM-DD-YYYY"),
    endDate: moment(currentDate, moment.ISO_8601).utc().format("MM-DD-YYYY")
  });

  var factets = {
    facets: [
      {
        "field": "date.created",
        "interval": interval
      }
    ]
  };

  var count = 0;
  var rw = reliefweb.client();
  content.forEach(function(val, key) {

    var type;
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
        'field': 'country.name',
        'value': countries,
        'operator': 'OR'
      });
    }

    if (val.type == "maps") {
      type = "reports";
      filters.filter.conditions.push({
        "field": "format.name",
        "value": ["Map", "Infographic"],
        "operator": "OR"
      });
    }
    else {
      type = val.type;
    }

    rw.post(type)
      .send({preset: "analysis", limit: 0})
      .send(factets)
      .send(filters)
      .sort('date.created', 'asc')
      .end(function(err, res) {
        if (!err) {
          count++;
          // TODO: Check to make sure values exists before setting.
          content[key].count = res.body.totalCount;
          content[key].graphData = res.body.embedded.facets["date.created"].data;
          if (count == content.length) {
            updatePage(content);
          }
        }
      });
  });
};

module.exports = RiverWidget;
