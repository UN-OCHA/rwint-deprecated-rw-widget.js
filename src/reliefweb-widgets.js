"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

// Utilities
require('./util/handlebar-extensions');

// Widgets
var widgetBase = require('./widget-base');
var ImageWidget = require('./components/image/image');

var widgetRegistry = require('./util/config-manager')();

widgetRegistry.config('image', ImageWidget);

global.ReliefwebWidgets = {
  widget: function(name, opts) {
    var Widget = widgetRegistry.config(name);
    if (Widget) {
      return new Widget(opts);
    }
    throw new Error("Can't find '" + name + "' widget.");
  },
  addWidgetToRegistry: function(name, widget) {
    widgetRegistry.config(name, widget);
  },
  listWidgets: function() {
    return widgetRegistry.list();
  },
  helpers: {
    widgetBase: widgetBase
  }
};

module.exports = function() {
  return global.ReliefwebWidgets;
};
