"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

// Utilities
require('./util/handlebar-extensions');

// Widgets
var ImageWidget = require('./components/image/image');

global.ReliefwebWidgets = {
  image: function(opts) {
    return new ImageWidget(opts);
  }
};

module.exports = function() {
  return global.ReliefwebWidgets;
};
