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

RiverWidget.prototype.link = function(elements) {

  var $element = $(elements[0][0]);
  var widget = this;
  var filters = widget.config('filters');
  var rw = reliefweb.client();

  function init() {
    console.log("filters", filters);
    filters.forEach(function(filter) {
      console.log("Filter", filter);
      getDataAndRender(filter.id, filter.filters);
    });

    $element.find('.accordion-set--label').click(function() {
      // Accordion is absolutely positioned, which means it won't play well with pym.js.
      var that = this;
      setTimeout(function() {
        var $accordian = $('#' + $(that).attr('for') + '-accordion');
        var height = $accordian.find('.widget-river--filters-content').height() + 75;
        $('.widget-river--results').height(height);
      }, 1);
    });
  }

  function getDataAndRender(filterId, filterData) {
    rw.post('reports')
      .send({'limit': 4})
      .send({
        'fields': {
          'include': ["title", "source", "date"]
        }
      })
      .send({"filter": filterData})
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

          var count = 0;

          var items = _.reduce(data, function(acc, value) {
            return acc + Handlebars.templates['river-item.hbs'](value);
          }, '');

          $('#' + filterId + '-accordion .filters-content--items', $element).empty().html(items);
        }
      });
  }

  init();
};

module.exports = RiverWidget;
