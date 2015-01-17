!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReliefwebWidgets=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":6}],2:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
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

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

ImageWidget.prototype = new WidgetBase();

module.exports = ImageWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":6}],3:[function(require,module,exports){
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

var widgetRegistry = require('./util/config-manager')();

widgetRegistry.config('image', ImageWidget);
widgetRegistry.config('crisis-overview', CrisisOverviewWidget);

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

},{"./components/crisis-overview/crisis-overview":1,"./components/image/image":2,"./util/config-manager":4,"./util/handlebar-extensions":5,"./widget-base":6}],4:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Configuration object. Allows for getting and setting of various properties.
 */

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

var config = function() {
  var _config = {};

  /**
   * Shortcut method for .config().
   * @see .config();
   */
  var myConfig = function() {
    return configMethod.apply(this, arguments);
  };

  /**
   * Config get/setter
   * @param - Accepts 0, 1 or 2 parameters
   *
   * .config() - Load config object.
   * .config(obj) - Sets multiple config options.
   * .config(string) - Loads a single config item based on key
   * .config(string, string) - Sets a string
   *
   * @returns {*}
   *   .config() - Returns object.
   *   .config(obj) - Returns resulting config object.
   *   .config(string) - Returns single config object.
   *   .config(string, string) - Returns resulting config object.
   */
  myConfig.config = function () {
    return configMethod.apply(this, arguments);
  };

  /**
   * @see .config().
   */
  function configMethod() {
    if (arguments.length === 0) {
      return _.cloneDeep(_config);
    }

    if (arguments.length === 1) {
      if (_.isObject(arguments[0])) {
        _config = _.defaults(arguments[0], _config);
        return _.cloneDeep(_config);
      } else if (_.isString(arguments[0])) {
        return _config[arguments[0]];
      }
    }

    if (arguments.length === 2) {
      _config[arguments[0]] = arguments[1];
      return _.cloneDeep(_config);
    }
  }

  /**
   *
   * @param key
   * @returns {*|boolean}
   */
  myConfig.has = function(key) {
    return _config.hasOwnProperty(key);
  };

  /**
   *
   * @returns {*}
   */
  myConfig.list = function() {
    return _.keys(_config);
  };

  return myConfig;
};

module.exports = config;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
"use strict";

var Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null),
    moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{#dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (global.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    var myDate = new Date(context);
    return moment(myDate).format(f);
  } else {
    return context;   //  moment plugin not available. return data as is.
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Contains the base functionality that we want with all widgets.
 */

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

var config = require('./util/config-manager');

/**
 * Constructor.
 * @param opts
 *   Options to pass to .config()
 */

var widgetBase = function(opts) {
  this._config = config();

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

widgetBase.prototype.config = function() {
  var _return = this._config.apply(this, arguments);

  // chainable
  return (_return) ? _return : this;
};

widgetBase.prototype.has = function(key) {
  return this._config.has(key);
};

/**
 * Default templating method. Uses Handlebars (http://handlebarsjs.com/) to render
 * content. Functionality differs depending on what's being passed in via the
 * config.template option.
 *
 * Note that you probably shouldn't load this directly, but instead rely on the render method.
 *
 * If config.template is a method, the template is assumed to be a pre-compiled
 * Handlebars template (see http://handlebarsjs.com/precompilation.html)
 *
 * If config.template is a string, and it starts with a '#', the template is assumed
 * to be an inline template inside a script tag and loaded from there.
 *
 * Otherwise, config.template is assumed to be a url and the template is loaded from
 * the external file.
 *
 * @param callback - A method to call once the Handlebars template method is prepared.
 */

widgetBase.prototype.template = function(callback) {
  var config = this.config();

  if (config.template) {
    if (typeof config.template === "function") {
      callback(config.template(config));
    } else {
      if (config.template.charAt(0) === '#') {
        var content = d3.select(config.template).html();
        var template = Handlebars.compile(content);
        callback(template(config));
      } else {
        d3.text(config.template, function(res) {
          var template = Handlebars.compile(res);
          callback(template(config));
        });
      }
    }
  } else {
    throw new Error("No widget template specified.");
  }
};

widgetBase.prototype.render = function(element) {
  this.template(function(content) {
    d3.select(element)
      .classed('rw-widget', true)
      .classed('rw-widget-image', true)
      .html(content);
  });
};

module.exports = widgetBase;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/config-manager":4}]},{},[3])(3)
});