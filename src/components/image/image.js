"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');

var ImageWidget = function(opts) {
  var config = {
    title: "Image Widget",
    template: 'image.hbs'
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

ImageWidget.prototype = new WidgetBase();

module.exports = ImageWidget;
