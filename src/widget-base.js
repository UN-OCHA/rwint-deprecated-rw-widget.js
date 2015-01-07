"use strict";

var _ = require('lodash'),
    d3 = require('d3'),
    Handlebars = require('handlebars');

/**
 * Constructor.
 * @param opts
 *   Options to pass to .config()
 */

var widgetBase = function(opts) {
  this._config = {};

  if (opts) {
    this.config(opts);
  }
};

/**
 * Config get/setter
 * @param [opts] - Options for config.
 * @returns {*}
 *   .config() - Returns config object.
 *   .config(obj) - Returns this for chaining.
 */

widgetBase.prototype.config = function(opts) {
  if (opts === undefined) {
    return _.cloneDeep(this._config);
  }

  this._config = _.defaults(opts, this._config);

  // chainable
  return this;
};

/**
 *
 * @param callback
 */

widgetBase.prototype.template = function(callback) {
  var config = this.config();

  if (config.template) {
    d3.text(config.template, function(res) {
      var template = Handlebars.compile(res);
      callback(template(config));
    });
  }
};

widgetBase.prototype.render = function(element) {
  this.template(function(content) {
    d3.select(element).html(content);
  });
};

module.exports = widgetBase;
