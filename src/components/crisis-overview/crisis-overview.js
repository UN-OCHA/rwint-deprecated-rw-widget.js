"use strict";

var _ = require('lodash');
var d3 = require('d3');
var $ = require('jquery');
var numeral = require('numeral');
var WidgetBase = require('beat-blocks').helpers.widgetBase;

// load template
require('./crisis-overview.hbs.js');

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

CrisisOverviewWidget.prototype.compile = function(elements, next) {
  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  // Traverses data indicators looking for points that are structured as API-driven content.
  // This is then formatted via our custom 'en-long' language to handle quantifier mappings.
  numeral.language('en-long');
  for (var i in config.indicators) {
    for (var j in config.indicators[i].data) {
      var original = config.indicators[i].data[j];
      if (original.figure !== null && typeof original.figure === 'object' && original.figure.type == 'request') {
        var value = numeral(original.figure.content[0].value).format('0.00 a').split(' ');
        this.config('indicators.' + i + '.data.' + j + '.figure', value[0]);
        if (!original.quantifier) {
          this.config('indicators.' + i + '.data.' + 0 + '.quantifier', value[1]);
        }
      }
    }
  }

  this.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });
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


CrisisOverviewWidget.prototype.link = function(elements) {
  // Open links in a new tab.
  $('.overview-widget a').attr('target', '_blank');

  function accordion_set_clear_all_active() {
    $('.accordion-set')
      .find('.accordion-set--check').removeClass('is-active').end()
      .find('.accordion-set--label').removeClass('is-active').end()
      .find('.accordion-set--content').removeClass('is-active');
  }

  function accordion_set_clear_active(el) {
    $(el)
      .removeClass('is-active')
      .next('.accordion-set--label').removeClass('is-active')
      .next('.accordion-set--content').removeClass('is-active');
  }

  function accordion_set_add_active(el) {
    $(el)
      .addClass('is-active')
      .next('.accordion-set--label').addClass('is-active')
      .next('.accordion-set--content').addClass('is-active');
  }

  $('.accordion-set--check').change(function(ev){
    if($(this).is('[type=radio]')) {
      accordion_set_clear_all_active();
    }
    if ($(this).is(':checked')) {
      accordion_set_add_active($(this));
    } else {
      accordion_set_clear_active($(this));
    }
  });

  accordion_set_add_active($('.accordion-set--check:checked'));
};

module.exports = CrisisOverviewWidget;
