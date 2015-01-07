"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');

var ImageWidget = function(opts) {
  var config = {
    title: "Image Widget",
    template: "image.hbs",
    src: "https://placekitten.com/g/350/150",
    alt: "Cat",
    credit: ""
  };

  opts = (opts) ? opts : {};

  console.log(config, opts);

  config = _.defaults(opts, config);
  console.log(config);
  WidgetBase.call(this, config);
};

ImageWidget.prototype = new WidgetBase();

module.exports = ImageWidget;
