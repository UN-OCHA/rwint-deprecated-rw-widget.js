"use strict";

var _ = require('lodash');
var d3 = require('d3');
var WidgetBase = require('../../widget-base');

var TimelineWidget = function(opts) {
  var config = {
    title: "Crisis Overview",
    template: "crisis-overview.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.render = function(element) {
  this.template(function(content) {
    d3.select(element)
      .classed('rw-widget', true)
      .html(content);
  });
};

module.exports = TimelineWidget;
