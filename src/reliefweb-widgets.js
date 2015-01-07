"use strict";

var d3 = require('d3'),
    _ = require('lodash'),
    Handlebars = require('Handlebars'),
    moment = require('moment'),
    reliefweb = require('reliefweb');

var ImageWidget = require('./components/image/image');

var rw = reliefweb.client();

var _render = function(selector) {
  var widget = this;

  widget.element = d3.select(selector);

  d3.text(this.opts.templatePath, function(res) {
    var template = Handlebars.compile(res);
    var markup = template({title: widget.opts.title});
    console.log(markup, widget.element);
    widget.element.html(markup);

    d3.select(selector).append('script').attr({
      'type': "text/javascript",
      'src': "../src/widget/heatmap.js"
    });
  });
  console.log(this, selector);

  return widget;
};

global.ReliefwebWidgets = {
  widget: function(opts) {
    var baseWidget = new this.baseWidget();

    return _.assign(baseWidget, {
      opts: opts,
      render: _render
    });
  },
  river: function(opts) {
    this.widget(opts);
  },
  heatmap: function(opts) {
    opts.templatePath = '../templates/heatmap.hbs';
    return this.widget(opts);
  },
  image: function(opts) {
    return new ImageWidget(opts);
  }
};

module.exports = function() {
  return global.ReliefwebWidgets;
};
