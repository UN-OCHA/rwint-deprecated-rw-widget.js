;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};"use strict";

var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null),
    moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null),
    Reliefweb = (typeof window !== "undefined" ? window.Reliefweb : typeof global !== "undefined" ? global.Reliefweb : null);

var rw = new Reliefweb();

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
    // Widget method should add template, inject css/js.

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
  }
};

module.exports = function() {
  return d3.version;
};

},{}],3:[function(require,module,exports){
(function(window) {
  if (window.ReliefwebWidgets === undefined) {window.ReliefwebWidgets = {};}

  ReliefwebWidgets.baseWidget = function() {
    return {};
  };
})(window);

},{}]},{},[1,2,3])
;