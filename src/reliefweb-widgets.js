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
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river/river');
var TimelineWidget = require('./components/timeline/timeline');

var widgetRegistry = require('./util/config-manager')();

widgetRegistry.config('image', ImageWidget);
widgetRegistry.config('crisis-overview', CrisisOverviewWidget);
widgetRegistry.config('river', RiverWidget);
widgetRegistry.config('timeline', TimelineWidget);

module.exports = {
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
