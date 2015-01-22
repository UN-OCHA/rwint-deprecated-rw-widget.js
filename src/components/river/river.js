"use strict";

var _ = require('lodash');
var WidgetBase = require('../../widget-base');
var $ = require('jquery');

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

RiverWidget.prototype.link = function(elements) {

  var $element = $(elements[0][0]);
  function init() {

    //$('select', $element).selectric();

    // Open popup.
    $('.river-widget--dropdown-heading, .close').click(function(){
      $('.river-widget--dropdown--wrapper').toggleClass('open');
    });

    // Close popup.
    $('.river-widget-dropdown--item').click(function(){
      $('.river-widget--dropdown--wrapper').removeClass('open');
    });
  }

  init();
};

module.exports = RiverWidget;
