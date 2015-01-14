"use strict";

var _ = require('lodash');
var d3 = require('d3');
var WidgetBase = require('../../widget-base');

var CrisisOverviewWidget = function(opts) {
  var config = {
    title: "Crisis Overview",
    template: "crisis-overview.hbs",
    map: {
      src: "",
      alt: ""
    }
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

CrisisOverviewWidget.prototype = new WidgetBase();

CrisisOverviewWidget.prototype.render = function(element) {
  var config = this.config();
  var that = this;
  if (config.configFile) {
    d3.json(config.configFile, function(e, res) {
      for (var key in res) {
        that.config(key, res[key]);
      }

      config = that.config();
      that.config('adjustedTitle', titleAdjust(config.title));

      that.template(function(content) {
        d3.select(element)
          .classed('rw-widget', true)
          .classed('rw-widget-image', true)
          .html(content);
      });
    });
  } else {

  }
};

function titleAdjust(title) {
  var snippet = '<span class="word[[counter]]">[[word]]</span>';
  var words = title.split(' ');
  var adjustedTitle = '';
  for (var i = 0; i < words.length; i++) {
    adjustedTitle += snippet.replace('[[counter]]', i + 1).replace('[[word]]', words[i]);
  }
  return adjustedTitle;
}

module.exports = CrisisOverviewWidget;
