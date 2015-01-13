(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
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

module.exports = CrisisOverviewWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":7}],2:[function(require,module,exports){
(function(window, d3, Handlebars, moment, _, Reliefweb) {
  var config = {
    'title': "Timeline"
  };

  var HeatmapComponent = function(options) {

    if (options) {
      this.config(options);
    }

  };

  HeatmapComponent.prototype.parameters = function() {
    return [{
      'title': {
        'default': 'Timeline',
        type: 'text'
      }
    }];
  };

  HeatmapComponent.prototype.dependencies = function() {
    return {
      'external': {
        'd3': '~3.3'
      }
    };
  };

  HeatmapComponent.prototype.config = function(newConfig) {
    if (newConfig === undefined) {
      return _.cloneDeep(config);
    }

    config = _.defaults(newConfig, config);

    // chainable
    return this;
  };

  HeatmapComponent.prototype.template = function(callback) {
    d3.text('../src/components/heatmap/heatmap.hbs', function(res) {
      var template = Handlebars.compile(res);
      callback(template(config));
    });
  };

  HeatmapComponent.prototype.render = function(element) {
    this.template(function(content) {
      d3.select(element).html(content);

      var rw = new Reliefweb();

      rw.post('reports')
            .limit(0)
            .send({"facets": [{"field": "date", "interval": "month", "sort": "value"}]})
            .end(function(err, res) {
              var data = _.map(res.body.embedded.facets.date.data, function(facet) {
                var theDate = moment(facet.epoch_ms);
                return {
                  count: facet.count,
                  label: theDate.format('MMMM YYYY'),
                  year: theDate.format('YYYY') * 1,
                  month: theDate.format('M') * 1
                }
              });

          var nestedData = d3.nest()
            .key(function(d) {return d.year;})
            .key(function(d) {return d.month;})
            .entries(data);

          var blockSize = 8,
            blockSpacer = 2,
            extent = [0, d3.max(data, function(d) {return d.count;})],
            colorRange = d3.scale.linear().domain(extent).range(['#FFFFFF', '#8749d8']);

          // heatmap specific
          var container = d3.select('.heatmap').append('svg').style('width', '100%');

          var yearContainers = container.selectAll('.year')
            .data(nestedData)
            .enter()
            .append('g')
            .attr({
              'class': function(d, i) {return 'year year-' + d.key;},
              'transform': function(d, i) {return "translate(" + i * (blockSize + blockSpacer) + ",0)"}
            });

          var monthContainers = yearContainers.selectAll('.month')
            .data(function(d) {return d.values;})
            .enter()
            .append('rect')
            .attr({
              'fill': function(d) { return colorRange(d.values[0].count);},
              'stroke': '#EEE',
              'y': function(d, i) {return d.values[0].month * (blockSize + blockSpacer)},
              'width': blockSize,
              'height': blockSize
            });
        });
    });


    return this;
  };

  window.HeatmapComponent = HeatmapComponent;
})(window, d3, Handlebars, moment, _, Reliefweb);

},{}],3:[function(require,module,exports){
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
},{"../../widget-base":7}],4:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/crisis-overview/crisis-overview":1,"./components/image/image":3,"./util/config-manager":5,"./util/handlebar-extensions":6,"./widget-base":7}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"./util/config-manager":5}]},{},[1,2,3,4,5,6,7]);
