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

CrisisOverviewWidget.prototype.compile = function(elements, next) {
  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  this.template(function(content) {
    elements
      .classed('rw-widget', true)
      .classed('rw-widget-image', true)
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

module.exports = CrisisOverviewWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],2:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);

var FinancialWidget = function(opts) {
  var config = {
    title: "Financial",
    template: "financial.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

FinancialWidget.prototype = new WidgetBase();

FinancialWidget.prototype.link = function(elements) {
  console.log("D3", d3);

  function init() {
    populateYearSelector();

    var sampleData = [{
      "name": "CLUSTER NOT YET SPECIFIED",
      "current_requirement": 0.0,
      "original_requirement": 0.0,
      "funding": 235341626.0,
      "pledges": 0.0
    }, {
      "name": "COORDINATION",
      "current_requirement": 50814214.0,
      "original_requirement": 50814214.0,
      "funding": 22261415.0,
      "pledges": 0.0
    }, {
      "name": "EARLY RECOVERY AND LIVELIHOODS",
      "current_requirement": 71054434.0,
      "original_requirement": 71054434.0,
      "funding": 13880484.0,
      "pledges": 0.0
    }, {
      "name": "EDUCATION",
      "current_requirement": 103163335.0,
      "original_requirement": 103163335.0,
      "funding": 39294677.0,
      "pledges": 0.0
    }, {
      "name": "EMERGENCY TELECOMMUNICATIONS (ETC)",
      "current_requirement": 1584010.0,
      "original_requirement": 1584010.0,
      "funding": 947887.0,
      "pledges": 0.0
    }, {
      "name": "FOOD AND AGRICULTURE",
      "current_requirement": 1118741037.0,
      "original_requirement": 1118741037.0,
      "funding": 537436935.0,
      "pledges": 44136.0
    }, {
      "name": "HEALTH",
      "current_requirement": 233376172.0,
      "original_requirement": 233376172.0,
      "funding": 103801571.0,
      "pledges": 0.0
    }, {
      "name": "LOGISTICS",
      "current_requirement": 12060910.0,
      "original_requirement": 12060910.0,
      "funding": 5576718.0,
      "pledges": 0.0
    }, {
      "name": "NON-FOOD ITEMS (NFIs) AND SHELTER",
      "current_requirement": 420903819.0,
      "original_requirement": 420903819.0,
      "funding": 29859588.0,
      "pledges": 41614.0
    }, {
      "name": "NUTRITION",
      "current_requirement": 29999820.0,
      "original_requirement": 29999820.0,
      "funding": 23062685.0,
      "pledges": 0.0
    }, {
      "name": "PROTECTION AND COMMUNITY SERVICES",
      "current_requirement": 73493864.0,
      "original_requirement": 73493864.0,
      "funding": 22035159.0,
      "pledges": 0.0
    }, {
      "name": "STAFF SAFETY SERVICES",
      "current_requirement": 6183984.0,
      "original_requirement": 6183984.0,
      "funding": 2466833.0,
      "pledges": 0.0
    }, {
      "name": "WASH",
      "current_requirement": 154773755.0,
      "original_requirement": 154773755.0,
      "funding": 45742146.0,
      "pledges": 0.0
    }];

    var w = 960,
        h = 500;

    var bubbleSizeScale = d3.scale.linear()
      .domain(d3.extent(sampleData, function(val) {return val.funding;}))
      .range([10, 150]);

    var bubblePlacementScale = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);

    var bubbleNeedsSmallClass = function(d) {
      return d.r < 50;
    };

    var titleCleanup = function(title) {
      return title.toLowerCase();
    };

    var nodes = d3.range(sampleData.length).map(function(i) {
      var fundingPercentage = (sampleData[i].current_requirement) ? sampleData[i].funding / sampleData[i].current_requirement : 0;
      return {
        title: titleCleanup(sampleData[i].name),
        fundingPercentage: fundingPercentage,
        r: bubbleSizeScale(sampleData[i].funding),
        x: bubblePlacementScale(fundingPercentage),
        y: Math.random() * h
      };
    });

    var svg = elements.select('#finance-bubbles')
      .append("svg")
      .attr({
        "width": w,
        "height": h
      });

    var force = d3.layout.force()
      .gravity(0.02)
      .friction(0.8)
      .nodes(nodes)
      .size([w, h]);

    force.start();

    var cluster = svg.selectAll(".cluster-bubble")
      .data(nodes)
      .enter()
      .append("g")
      .classed({
        'cluster-bubble': true,
        'small': bubbleNeedsSmallClass
      })
      .on('click', function(d) {
        console.log("data", d);
      });

    cluster.append("circle")
      .attr({
        r: function(d) {return d.r;}
      });

    cluster.append("text")
      .text(function(d) {return d.title;})
      .style("text-transform", "capitalize")
      .attr({
        "text-anchor": "middle",
        transform: function(d) {
          return (bubbleNeedsSmallClass(d)) ? "translate(0," + (d.r + 16) + ")" : '';
        }
      });

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          k = e.alpha * 0.1;

      nodes.forEach(function(o, i) {
        o.x += (bubblePlacementScale(o.fundingPercentage) - o.x) * k;

        if (o.x + o.r > h) {
          o.x -= 5 * k;
        } else if (o.x - o.r < 0) {
          o.x += 5 * k;
        }

        if (o.y + o.r > w) {
          o.y -= 5 * k;
        } else if (o.y - o.r < 0) {
          o.y += 5 * k;
        }

        q.visit(collide(o));
      });

      cluster.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
    });

    function collide(node) {
      var r = node.r + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.r + quad.point.r + 15; // 15 is padding between boxes
          if (l < r) {
            l = (l - r) / l * 0.5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]');
    var year = 2015;
    var selected = '';
    for (var i = 0; i < 5; i++) {
      selected = (year == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + year + '"' + selected + '>' + year + '</option>');
      year--;
    }
  }

  init();
};

module.exports = FinancialWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],3:[function(require,module,exports){
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
},{"../../widget-base":10}],4:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

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

    $('select', $element).selectric();

    // Open popup.
    $('.river-widget--dropdown-heading, .close', $element).click(function(){
      $('.river-widget--dropdown--wrapper', $element).toggleClass('open');
    });

    // Close popup.
    $('.river-widget-dropdown--item', $element).click(function(){
      $('.river-widget--dropdown--wrapper', $element).removeClass('open');
    });
  }

  init();
};

module.exports = RiverWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],5:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var WidgetBase = require('../../widget-base');
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);

var TimelineWidget = function(opts) {
  var config = {
    title: "Timeline",
    template: "timeline.hbs",
    countries: []
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.compile = function(elements, next) {
  var widget = this;
  var filters = {
      filter: {
      'operator': 'AND',
      'conditions': [
        {
          'field': 'headline.featured'
        }
      ]
    }
  };

  var countries = widget.config('countries');

  if (Array.isArray(countries) && countries.length) {
    filters.filter.conditions.push({
      'field': 'country',
      'value': countries,
      'operator': 'OR'
    });
  }

  var rw = reliefweb.client();
  rw.post('reports')
    .fields(['date', 'headline', 'primary_country', 'url'], [])
    .sort('date.original', 'desc')
    .send(filters)
    .end(function(err, res) {
      if (!err) {
        var timelineItems = [];
        res.body.data.forEach(function(val, key) {
          var prevMonth = (key !== 0) ? moment(timelineItems[key - 1]['date-full'], 'DD MMM YYYY').month() : -1;
          var item = {
            title: val.fields.headline.title,
            country: val.fields.primary_country.name,
            "long-desc": val.fields.headline.summary,
            "short-desc": val.fields.headline.title,
            "url": val.fields.url
          };

          if (val.fields.headline.image) {
            item["img-src"] = val.fields.headline.image.url;
          } else {
            // @TODO: Default image
          }

          var time = moment(val.fields.date.original,  moment.ISO_8601);
          item['date-full'] = time.format('DD MMM YYYY');
          item['date-month'] = time.format('MMMM');
          item['date-day'] = time.format('DD');
          item['date-year'] = time.format('YYYY');
          item['new-month'] = prevMonth !== time.month();

          timelineItems.push(item);
        });

        widget.config('timeline-items', timelineItems);

        widget.template(function(content) {
          elements
            .classed('rw-widget', true)
            .html(content);

          next();
        });
      }
    });

  //var timelineItems = this.config('timeline-items');
  //
  //timelineItems.forEach(function(val, key, items) {
  //  var prevMonth = (key !== 0) ? moment(items[key - 1]['date-full'], 'DD MMM YYYY').month() : -1;
  //  var myDate = moment(val['date-full'], 'DD MMM YYYY');
  //  items[key]['date-month'] = myDate.format('MMMM');
  //  items[key]['date-day'] = myDate.format('DD');
  //  items[key]['date-year'] = myDate.format('YYYY');
  //  items[key]['new-month'] = prevMonth !== myDate.month();
  //});
  //
  //this.config('timeline-items', timelineItems);
};

TimelineWidget.prototype.link = function(elements) {
  var timelineState = {};
  var timelineContent = this.config('timeline-items');

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      margin;

  var $sly,
      $slyPager,
      $slyDropdown;

  function findClosestTimelineContent() {
    var now = moment().unix();
    var closestIndex = 0;
    var closestIndexDistance;

    timelineContent.forEach(function(val, key) {
      var itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();
      if (closestIndexDistance === undefined || Math.abs(now - itemTime) < closestIndexDistance) {
        closestIndexDistance = Math.abs(now - itemTime);
        closestIndex = key;
      }
    });

    return closestIndex;
  }

  function init() {
    timelineState.currentIndex = findClosestTimelineContent();
    var now = moment(timelineContent[timelineState.currentIndex]['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    populateOverlaySelectors();

    $('select', $element).selectric();
    // Initialize Sly Sliders.
    $frame = $('.timeline-widget-frames', $element);
    $item = $('.timeline-widget-item', $element);
    margin = '40px';

    // Set initial widths.
    adjustTimelineWidth($frame.width());
    $item.css({ marginRight : margin});

    // Control resizing.
    $(window).resize(function(e) {
      adjustTimelineWidth($frame.width());
    });

    // Main slider.
    $sly = new Sly($frame, {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Pager.
    $slyPager = new Sly($('.timeline-widget-pager', $element), {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: timelineState.currentIndex,
      scrollBy: 1,
      activatePageOn: 'click',
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    paint();
  }

  function populateOverlaySelectors() {
    var months = moment.months();
    var monthsShort = moment.monthsShort('-MMM-');
    var $monthSelector = $('select[name="month"]', $element);

    months.forEach(function(val, key) {
      $monthSelector.append('<option value="' + monthsShort[key] + '">' + val + '</option>');
    });

    var $yearSelector = $('select[name="year"]', $element);
    var year = timelineState.currentYear;
    for (var i = 0; i < 5; i++) {
      $yearSelector.append('<option value="' + year + '">' + year + '</option>');
      year--;
    }
  }

  function paint() {
    slideTo(timelineState.currentIndex);

    var now = moment(timelineContent[timelineState.currentIndex]['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    $('select[name="month"]', $element).val(now.format('MMM')).selectric('refresh');
    $('select[name="year"]', $element).val(now.format('YYYY')).selectric('refresh');

    $element.find('.timeline-widget-pager--current').text(timelineState.currentFormatted);
  }

  function slideTo(index) {
    var $sliderPos = $sly.getPos(index);
    $sly.slideTo($sliderPos.center);

    var $pagerPos = $slyPager.getPos(index);
    $slyPager.slideTo($pagerPos.center);

    var $dropDownPos = $slyDropdown.getPos(index);
    $slyDropdown.slideTo($dropDownPos.start);
  }

  function adjustTimelineWidth(width) {
    $item.width(width);
    $('.timeline-widget-pager li', $element).width(Math.floor(width/3));

    if ($sly && $slyPager) {
      $sly.reload();
      $slyPager.reload();
    }
  }

  init();

  $('.timeline-widget-pager--item, .timeline-widget-dropdown--list-item', $element).click(function(){
    timelineState.currentIndex = $(this).attr('data-slide');
    paint();
  });

  // Open popup.
  $('.timeline-widget--dropdown-heading, .close', $element).click(function(){
    $('.timeline-widget--dropdown--wrapper').toggleClass('open');
    $slyDropdown.reload();
  });

  // Close popup.
  $('.timeline-widget-dropdown--item', $element).click(function(){
    $('.timeline-widget--dropdown--wrapper').removeClass('open');
  });

  $('.timeline-widget--dropdown-controls select', $element).on('selectric-change', function(element) {
    var currentString = $('select[name="month"]', $element).val() + ' ' + $('select[name="year"]', $element).val();
    var current = moment(currentString, 'MMM YYYY').unix();
    var itemTime;
    var val;


    for (var i = 0; i < timelineContent.length; i++) {
      val = timelineContent[i];
      itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();

      if (current < itemTime) {
        timelineState.currentIndex = i;
        paint();
        break;
      }
    }
  });

  // Update other sliders based on main.
  $sly.on('moveStart', function(){
    timelineState.currentIndex = $sly.rel.activeItem;
    paint();
  });
};

module.exports = TimelineWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../widget-base":10}],6:[function(require,module,exports){
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
var RiverWidget = require('./components/river/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

var widgetRegistry = require('./util/config-manager')();

widgetRegistry.config('image', ImageWidget);
widgetRegistry.config('crisis-overview', CrisisOverviewWidget);
widgetRegistry.config('river', RiverWidget);
widgetRegistry.config('timeline', TimelineWidget);
widgetRegistry.config('financial', FinancialWidget);

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

},{"./components/crisis-overview/crisis-overview":1,"./components/financial/financial":2,"./components/image/image":3,"./components/river/river":4,"./components/timeline/timeline":5,"./util/config-manager":7,"./util/handlebar-extensions":8,"./widget-base":10}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
/**
 * @file
 *
 * Utility functions/methods that don't fit anywhere else.
 */


var isNode = function() {
  return window === undefined;
};

module.exports = {
  isNode: isNode
};

},{}],10:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Contains the base functionality that we want with all widgets.
 */

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
    d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null),
    Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

var config = require('./util/config-manager');
var junkDrawer = require('./util/junk-drawer');

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
 * Main render method. This should be the primary method that devs use
 * to trigger a component render.
 *
 * @param selector (string) - See https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors
 * for valid css selectors.
 *
 * @return - Nothing
 */

widgetBase.prototype.render = function(selector) {
  var elements = d3.selectAll(selector);
  var widget = this;

  this._compile(elements, function() {
    if (!junkDrawer.isNode()) {
      widget.link(elements);
    }
  });
};

widgetBase.prototype._compile = function(elements, next) {
  var config = this.config();
  var that = this;
  if (config.configFile) {
    d3.json(config.configFile, function(e, res) {
      for (var key in res) {
        that.config(key, res[key]);
      }
      that.compile(elements, next);
    });
  } else {
    this.compile(elements, next);
  }
};

/**
 * Renders the markup of a widget. Should only be used to set the initial state
 * of a widget. See .link() for ways to add interactivity to component.
 *
 * As a convention, this code should be runnable both server-side and in the browser.
 * Only override if you need to adjust how the markup is being processed.
 *
 * @param elements - D3 object with pre-selected elements.
 */

widgetBase.prototype.compile = function(elements, next) {
  this.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });
};

/**
 * Provides a way to adjust a component after initial rendering. This method should be
 * overridden whenever a component needs to provide interactivity.
 *
 * @param elements - D3 object with pre-selected elements.
 */

widgetBase.prototype.link = function(elements) {};

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

module.exports = widgetBase;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/config-manager":7,"./util/junk-drawer":9}]},{},[6])(6)
});