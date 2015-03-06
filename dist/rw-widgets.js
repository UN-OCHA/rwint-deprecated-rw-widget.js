(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['crisis-overview.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "  <div class=\"overview-widget--map\">\n    <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n  </div>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"overview-widget--description\">\n    <div class=\"accordion-set\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "      <input type=\"checkbox\" id=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"accordion-set--check\""
    + ((stack1 = helpers['if'].call(depth0,(data && data.index),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n      <label for=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"accordion-set--label\"><h2>"
    + alias3(alias4((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2></label>\n      <div class=\"accordion-set--content\" data-eq-pts=\"cols2: 500\">\n        "
    + ((stack1 = alias4((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "")
    + "\n      </div>\n";
},"5":function(depth0,helpers,partials,data) {
    return "";
},"7":function(depth0,helpers,partials,data) {
    return " checked=\"checked\"";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"overview-widget--tabs tab-set\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"tab-set--content\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"10":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <input type=\"radio\" name=\"tab\" id=\"tab-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-set--tab\""
    + ((stack1 = helpers['if'].call(depth0,(data && data.index),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "/>\n    <label for=\"tab-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(this.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</label>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "      <div id=\"tab-body-"
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-set--body\">\n        <h2>"
    + alias1(this.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n        <i class=\"un-icon-crisis_population_displacement\"></i>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n";
},"13":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "        <div class=\"refugees\">\n          <h3><span class=\"figure\">"
    + alias2(alias1((depth0 != null ? depth0.figure : depth0), depth0))
    + "</span> "
    + alias2(alias1((depth0 != null ? depth0.quantifier : depth0), depth0))
    + "</h3>\n          <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"overview-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-crisis_conflict widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.map : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.indicators : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <footer class=\"overview-widget--sources\">"
    + ((stack1 = ((helper = (helper = helpers.dataSource || (depth0 != null ? depth0.dataSource : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dataSource","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</footer>\n</div>\n";
},"useData":true});
})();
},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var WidgetBase = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null).helpers.widgetBase;

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
};

module.exports = CrisisOverviewWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./crisis-overview.hbs.js":1}],3:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['financial.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "    <a href=\"\" class=\"financial-widget--data-source\">"
    + this.escapeExpression(((helper = (helper = helpers.dataItemTitle || (depth0 != null ? depth0.dataItemTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"dataItemTitle","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = 
  "<div class=\"financial-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_fund widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"financial-widget--data-source-chooser\">\n";
  stack1 = ((helper = (helper = helpers.dataSources || (depth0 != null ? depth0.dataSources : depth0)) != null ? helper : alias1),(options={"name":"dataSources","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.dataSources) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <div class=\"financial-widget--time\">\n    <h1>"
    + alias3(((helper = (helper = helpers.dataItemTitleCurrent || (depth0 != null ? depth0.dataItemTitleCurrent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dataItemTitleCurrent","hash":{},"data":data}) : helper)))
    + "</h1>\n    <select class=\"financial-widget--time-select\" name=\"time-chooser\" id=\"\">\n    </select>\n  </div>\n  <div class=\"financial-widget--percent-funded\">\n    <div class=\"financial-widget--percent-funded--amount covered\">$2.12B Funded <span class=\"percent\">57% <span>covered</span></span>\n    </div>\n    <div class=\"financial-widget--percent-funded--amount requested \">$3.74B Requested</div>\n  </div>\n  <div class=\"financial-widget--cluster-funding\">\n    <h2>Requirements &amp; Funding Per Cluster</h2>\n    <div id=\"finance-bubbles\"></div>\n  </div>\n  <footer class=\"financial-widget--explore\"><a href=\""
    + alias3(((helper = (helper = helpers.fundingDocumentURL || (depth0 != null ? depth0.fundingDocumentURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fundingDocumentURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Explore Funding Documents via ReliefWeb</a></footer>\n  <footer class=\"financial-widget--sources\">Data Source <cite><a href=\""
    + alias3(((helper = (helper = helpers.dataSourceURL || (depth0 != null ? depth0.dataSourceURL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dataSourceURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Financial Tracking Service</a></cite></footer>\n</div>\n";
},"useData":true});
})();
},{}],4:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null).helpers.widgetBase;
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

// load template
require('./financial.hbs.js');

var FinancialWidget = function(opts) {
  var config = {
    title: "Financial Support",
    template: "financial.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

FinancialWidget.prototype = new WidgetBase();

FinancialWidget.prototype.compile = function(elements, next) {
  var widget = this;
  var calculatedDataSources = {};

  var dataSources = widget.config('dataSources');

  dataSources.forEach(function(val, key, items) {
    var currentRequirementTotal, pledgesTotal, fundingTotal;
    currentRequirementTotal = pledgesTotal = fundingTotal = 0;

    // Get totals.
    $.each(val.clusters, function() {
      currentRequirementTotal += this.current_requirement;
      pledgesTotal += this.pledges;
      fundingTotal += this.funding;
    });

    // Format percentage raised.
    var percentageRaised = (fundingTotal / currentRequirementTotal) * 100;
    percentageRaised = percentageRaised.toFixed(2);

    // Format totals.
    currentRequirementTotal = formatMillionsBillions(currentRequirementTotal);
    pledgesTotal = formatMillionsBillions(pledgesTotal);
    fundingTotal = formatMillionsBillions(fundingTotal);

    calculatedDataSources[val.dataItemTitle] = {
      "currentRequirementTotal": currentRequirementTotal,
      "pledgesTotal": pledgesTotal,
      "fundingTotal": fundingTotal,
      "percentageRaised": percentageRaised
    };
  });

  function formatMillionsBillions(value) {
    var formattedValue = value / 1000000000;
    if ((formattedValue) > 1) {
      formattedValue = formattedValue.toFixed(2) + ' B';
    }
    else {
      formattedValue = value / 1000000;
      formattedValue = formattedValue.toFixed(2) + ' M';
    }
    return formattedValue;
  }

  this.config('calculatedDataSources', calculatedDataSources);

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });

  // Set the initial dataSourceURL
  var dataSourceURL = dataSources[0].dataSourceURL;
  $('.financial-widget--sources a').attr('href', dataSourceURL);
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

FinancialWidget.prototype.link = function(elements) {
  var widget = this,
      config = widget.config(),
      $element = $(elements[0][0]), // @TODO, grab any potential element selected.
      calculatedDataSources = config.calculatedDataSources;

  var chartState = {
    direction: ($('#finance-bubbles').width() > 650) ? 'horizontal' : 'vertical',
    currentSection: 0
  };

  function init() {
    populateYearSelector();

    chartInit();

    // Set first item active and populate the bar.
    $('.financial-widget--data-source-chooser :first-child', $element).toggleClass('active');
    populateBar();

    $('.financial-widget--data-source', $element).click(function(e){
      e.preventDefault();
      var selected = this.text;
      chartState.currentSection = _.findKey(config.dataSources, function(val) {return val.dataItemTitle == selected;});

      if (config.dataSources[chartState.currentSection].clusters.length <= 1) {
        $('.financial-widget--cluster-funding', $element).hide();
      } else {
        $('.financial-widget--cluster-funding', $element).show();
      }

      chartInit();

      // Set the title.
      setTitle(selected);

      // Set data for selected source.
      setBar(selected);

      // Toggle active class.
      $('.financial-widget--data-source').removeClass('active');
      $(this).toggleClass('active');

      // Set the dataSourceURL
      var dataSourceURL = config.dataSources[chartState.currentSection].dataSourceURL;
      $('.financial-widget--sources a').attr('href', dataSourceURL);
    });
  }

  function chartInit() {
    var sampleData = config.dataSources[chartState.currentSection].clusters;

    $('#finance-bubbles', $element).empty();

    if (sampleData.length <= 1) {
      return;
    }

    var margin = {top: 20, bottom: 20, left: 50, right: 20},
      w = $('#finance-bubbles', $element).width() - margin.left - margin.right,
      h = (chartState.direction == 'horizontal') ? 500 : 680;

    h = h - margin.top - margin.bottom;

    var maxBubbleRadius = (chartState.direction == 'horizontal') ? 25000 : 4000;

    var bubbleSizeScale = d3.scale.linear()
      .domain(d3.extent(sampleData, function(val) {return val.funding;}))
      .range([1000, maxBubbleRadius]);

    var bubblePlacementRange = (chartState.direction == 'horizontal') ? [0, w] : [h, 0];

    var bubblePlacementScale = d3.scale.linear()
      .domain([0, 1])
      .range(bubblePlacementRange);

    var bubbleNeedsSmallClass = function(d) {
      return d.r < 50;
    };

    var titleCleanup = function(title) {
      return title;
    };

    var windowResize = function() {
      var axisSwitch = false,
        oldDirection = chartState.direction;

      w = $('#finance-bubbles').width();
      svg.attr("width", w);
      w = w - margin.left - margin.right;

      chartState.direction = ($('#finance-bubbles').width() > 650) ? 'horizontal' : 'vertical';

      axisSwitch = (chartState.direction !== oldDirection);

      var maxBubbleRadius = (chartState.direction == 'horizontal') ? 25000 : 4000;
      bubbleSizeScale.range([1000, maxBubbleRadius]);

      gridYAxis.innerTickSize(-w);

      if (axisSwitch) {
        h = (chartState.direction == "horizontal") ? 500 : 680;
        svg.attr("height", h);
        h = h - margin.top - margin.bottom;

        gridXAxis.innerTickSize(-h);

        nodes.forEach(function(val, key) {
          nodes[key].r = Math.sqrt(bubbleSizeScale(val.funded) / Math.PI);
          nodes[key].x = (chartState.direction == 'horizontal') ? bubblePlacementScale(val.fundingPercentage) : w / 2 + ((Math.random() * 4) - 2);
          nodes[key].y = (chartState.direction == 'horizontal') ? h / 2 + ((Math.random() * 4) - 2) : bubblePlacementScale(val.fundingPercentage);
        });

        cluster.classed({
            'small': bubbleNeedsSmallClass
          });

        cluster.selectAll("circle")
          .attr({
            r: function(d) {return d.r;}
          });

        cluster.selectAll("text")
          .attr({
            transform: function(d) {
              return (bubbleNeedsSmallClass(d)) ? "translate(0," + (d.r + 16) + ")" : '';
            }
          });

        cluster.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
      }

      if (force) {
        force.size([w, h]);
        force.start();
      }

      if (chartState.direction == 'horizontal') {
        bubblePlacementScale.range([0, w]);
        canvas.select(".grid.x").style('display', 'block').call(gridXAxis);
        canvas.select(".axis.x-top").style('display', 'block').call(xAxisTop);
        canvas.select(".axis.x").attr("transform", "translate(0," + h + ")").style('display', 'block').call(xAxis);
        canvas.select(".axis.y").style('display', 'none');
        canvas.select(".grid.y").style('display', 'none');
      } else {
        bubblePlacementScale.range([h, 0]);
        canvas.select(".axis.x-top").style('display', 'none');
        canvas.select(".axis.x").style('display', 'none');
        canvas.select(".grid.x").style('display', 'none');
        canvas.select(".grid.x").style('display', 'none');
        canvas.select(".axis.y").style('display', 'block').call(yAxis);
        canvas.select(".grid.y").style('display', 'block').call(gridYAxis);
      }
    };

    $(window).resize(function() {
      windowResize();
    });

    var nodes = d3.range(sampleData.length).map(function(i) {
      var fundingPercentage = (sampleData[i].current_requirement) ? sampleData[i].funding / sampleData[i].current_requirement : 0;
      return {
        title: titleCleanup(sampleData[i].name),
        fundingPercentage: fundingPercentage,
        requested: sampleData[i].original_requirement,
        funded: sampleData[i].funding,
        r: Math.sqrt(bubbleSizeScale(sampleData[i].funding) / Math.PI),
        x: (chartState.direction == 'horizontal') ? bubblePlacementScale(fundingPercentage) : w / 2 + ((Math.random() * 4) - 2),
        y: (chartState.direction == 'horizontal') ? h / 2 + ((Math.random() * 4) - 2) : bubblePlacementScale(fundingPercentage)
      };
    }).sort(function(a, b) {
      return b.fundingPercentage - a.fundingPercentage;
    });

    var svg = elements.select('#finance-bubbles')
      .append("svg")
      .attr({
        "width": w + margin.left + margin.right,
        "height": h + margin.top + margin.bottom
      });

    var xAxisTop = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("top");

    var xAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .tickValues([0, 0.25, 0.5, 0.75, 1])
      .tickFormat(function(d) {
        return (d * 100) + "%";
      })
      .orient("left");

    var gridXAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .orient("top").tickFormat("")
      .innerTickSize(-h)
      .outerTickSize(0)
      .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);

    var gridYAxis = d3.svg.axis()
      .scale(bubblePlacementScale)
      .orient("left").tickFormat("")
      .innerTickSize(-w)
      .outerTickSize(0)
      .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);

    var canvas = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    canvas.append("g")
      .classed({
        "x": true,
        "axis": true
      })
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

    canvas.append("g")
      .classed({
        "x-top": true,
        "axis": true
      })
      .attr("transform", "translate(0,0)")
      .call(xAxisTop);

    canvas.append("g")
      .classed({
        "y": true,
        "axis": true
      })
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    canvas.append("g")
      .classed({
        "x": true,
        "grid": true
      })
      .attr("transform", "translate(0,0)")
      .call(gridXAxis);

    canvas.append("g")
      .classed({
        "y": true,
        "grid": true
      })
      .attr("transform", "translate(0,0)")
      .call(gridYAxis);

    var force = d3.layout.force()
      .gravity(0)
      .friction(0.8)
      .nodes(nodes)
      .size([w, h]);

    var cluster = canvas.selectAll(".cluster-bubble")
      .data(nodes)
      .enter()
      .append("g")
      .classed({
        'cluster-bubble': true,
        'small': bubbleNeedsSmallClass
      })
      .style({
        "cursor": "pointer"
      })
      .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
      .on('click', function(d) {
        addClusterOverlay(d);
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

    cluster.selectAll("text")
      .call(wrap, 200);

    windowResize();

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
        k = e.alpha * 0.1;

      nodes.forEach(function(o, i) {
        if (chartState.direction == 'horizontal') {
          o.x += (bubblePlacementScale(o.fundingPercentage) - o.x) * k;
          // pull towards middle of chart
          o.y = (o.y > h / 2) ? o.y - (3 * k) : o.y + (3 * k);
        } else {
          o.y += (bubblePlacementScale(o.fundingPercentage) - o.y) * k;
          // pull towards middle of chart
          o.x = (o.x > w / 2) ? o.x - k : o.x + k;
        }

        if (o.x + o.r > w) {
          o.x -= 400 * k;
        } else if (o.x - o.r < 0) {
          o.x += 400 * k;
        }

        if (o.y + o.r + 20 > h) {
          o.y -= 400 * k;
        } else if (o.y - o.r < 0) {
          o.y += 400 * k;
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
            r = node.r + quad.point.r;

          // add padding
          r += (chartState.direction == 'horizontal') ? 40 : 20;

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

    function addClusterOverlay(node) {
      var percentageFormatter = d3.format("%");
      var fundingPrefix;

      var overlay = svg.append("g")
        .attr("id", "detail-overlay")
        .style("display", "block");

      overlay.append("rect")
        .classed("detail--block", true)
        .attr({
          "x": 0,
          "y": 0,
          "width": w + margin.left + margin.right,
          "height": h + margin.top + margin.bottom
        });

      overlay.append("circle")
        .classed("detail--info", true)
        .attr({
          "stroke-width": 5,
          cx: w / 2,
          cy: h / 2,
          r: (w < h) ? (w / 2) - 10 : (h / 2) - 10
        });

      var textContainer = overlay.append("g")
        .classed("detail--text", true);

      textContainer.append("text")
        .classed("detail--title", true)
        .attr({
          "text-anchor": "middle"
        })
        .text(node.title);

      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,20)"
        })
        .text(percentageFormatter(node.fundingPercentage) + " funded");

      fundingPrefix = d3.formatPrefix(node.requested);
      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,40)"
        })
        .text(fundingPrefix.scale(node.requested).toFixed(2) + fundingPrefix.symbol + " Requested");

      fundingPrefix = d3.formatPrefix(node.funded);
      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,60)"
        })
        .text(fundingPrefix.scale(node.funded).toFixed(2) + fundingPrefix.symbol + " Funded");

      var bbox = textContainer.node().getBBox(),
        xTrans = ((w / 2)) + 10,
        yTrans = ((h / 2) - (bbox.height / 2) + margin.top) + 10;

      textContainer.attr({
        "transform": "translate(" + xTrans + "," + yTrans + ")"
      });

      overlay.append("rect")
        .attr({
          "x": 0,
          "y": 0,
          "width": w + margin.left + margin.right,
          "height": h + margin.top + margin.bottom,
          "fill": "none"
        })
        .style("pointer-events", "all")
        .on("click", function() {
          removeClusterOverlay();
        });
    }

    function removeClusterOverlay() {
      d3.select('#detail-overlay').remove();
    }

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 20, // px
          y = text.attr("y"),
          dy = 0,
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

        word = words.pop();
        while (word) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("y", ++lineNumber * lineHeight + dy + "px").text(word);
          }
          word = words.pop();
        }
      });
    }
  }

  function populateYearSelector() {
    var $yearSelector = $('select[name="time-chooser"]', $element);
    // We are not pulling any 2015 data at this time. Start with 2014.
    var currentYear = moment().subtract(1, "years").format('YYYY');
    var selected = '';
    for (var i = 0; i < 4; i++) {
      selected = (currentYear == 2015) ? 'selected' : '';
      $yearSelector.append('<option value="' + currentYear + '"' + selected + '>' + currentYear + '</option>');
      currentYear--;
    }
    $yearSelector.selectric();
  }

  function populateBar() {
    var first = Object.keys(calculatedDataSources)[0];
    setBar(first);
  }

  function setTitle(value) {
    $('.financial-widget--time h1').text(value);
  }

  function setCovered(funded, percentage) {
    var value = '$' + funded + ' Funded <span class="percent">' + percentage + '% <span>covered</span></span>';

    // Not sure why it adds 20 when using .width().
    // Because of this, I'm manually subtracting 20 from the value.
    $('.financial-widget--percent-funded .covered').width(percentage-20 + '%').html(value);
  }

  function setRequested(value) {
    $('.financial-widget--percent-funded .requested').html('$' + value + ' Requested');
  }

  function setBar(value) {
    var selectedSource = calculatedDataSources[value];
    setCovered(selectedSource.fundingTotal, selectedSource.percentageRaised);
    setRequested(selectedSource.currentRequirementTotal);
  }

  init();
};

module.exports = FinancialWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./financial.hbs.js":3}],5:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river-item.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"filters-content--item\">\n  <div class=\"filters-content--item-date\">"
    + alias3(((helper = (helper = helpers.item_date || (depth0 != null ? depth0.item_date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_date","hash":{},"data":data}) : helper)))
    + "</div>\n  <h3 class=\"filters-content--item-title\">"
    + alias3(((helper = (helper = helpers.item_title || (depth0 != null ? depth0.item_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_title","hash":{},"data":data}) : helper)))
    + "</h3>\n  <div class=\"filters-content--item-source\">"
    + alias3(((helper = (helper = helpers.item_source || (depth0 != null ? depth0.item_source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"item_source","hash":{},"data":data}) : helper)))
    + "</div>\n</li>";
},"useData":true});
})();
},{}],6:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['river.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"widget-river\" id=\"widget-river\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_reporting widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"widget-river--results clearfix\">\n\n    <div class=\"accordion-set widget-river--filters results--item--reports\">\n      <h5 class=\"widget-river--filters--title\">Filter Results:  <span class=\"tab\">Reports</span> <span class=\"close\"></span></h5>\n      <!--Item 1-->\n      <input type=\"radio\" name=\"river\" id=\"situation-reports\" class=\"accordion-set--check\"/>\n      <label for=\"situation-reports\" class=\"accordion-set--label\">Situation Reports</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Situation Reports</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">25 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Factsheet Syrian Crisis - January 2015</h3>\n\n              <div class=\"filters-content--item-source\">Swiss Agency for Development and Coopration</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">23 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Jordan Refugee Response - Inter-Agency Winterization Update: Response to Snow Storm Jana, 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">18 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syrian refugees: Inter-agency regional update, 18 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">18 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria operations from Turkey, Humanitarian Bulletin Issue 13 | 02-17 Feb 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 2-->\n      <input type=\"radio\" name=\"river\" id=\"needs-assessments\" class=\"accordion-set--check\"/>\n      <label for=\"needs-assessments\" class=\"accordion-set--label\">Needs Assessments</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Needs Assessments</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">An assessment of antenatal care among Syrian refugees in Lebanon</h3>\n\n              <div class=\"filters-content--item-source\">BioMed Central</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">23 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Winterisation assessment in Al Za’atari refugee camp in Jordan - October 2014</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees, REACH Initiative</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">13 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Economic and social impact assessment of the Syrian conflict and the ISIS crisis</h3>\n\n              <div class=\"filters-content--item-source\">World Bank</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">03 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Understanding livelihoods in northern Syria: how people are coping with repeated shocks, constant change and an uncertain future</h3>\n\n              <div class=\"filters-content--item-source\">Save the Children</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 3-->\n      <input type=\"radio\" name=\"river\" id=\"education\" class=\"accordion-set--check\"/>\n      <label for=\"education\" class=\"accordion-set--label\">Education</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Education</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Programmes implemented by the UN Agencies with the contribution of the Italian Government for a total amount of 2.5 million Euro</h3>\n\n              <div class=\"filters-content--item-source\">UN Development Programme</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Japan commits US$ 32.2 million to support Palestine refugees</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 4-->\n      <input type=\"radio\" name=\"river\" id=\"emergency-shelter\" class=\"accordion-set--check\"/>\n      <label for=\"emergency-shelter\" class=\"accordion-set--label\">Emergency Shelter</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Emergency Shelter</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Response Official Fuel Prices Snapshot (Jan 2014 – Feb 2015)</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Inter-Sector Working Group (ISWG) Work Plan: January to June 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN High Commissioner for Refugees</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Japan commits US$ 32.2 million to support Palestine refugees</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 5-->\n      <input type=\"radio\" name=\"river\" id=\"emergency-telecommunications\" class=\"accordion-set--check\"/>\n      <label for=\"emergency-telecommunications\" class=\"accordion-set--label\">Emergency Telecommunications</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Emergency Telecommunications</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Turkey | Syria: Border Crossings Status - 27 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Crisis: Logistics Cluster Warehouse Capacity as of 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Assistant Secretary-General for Humanitarian Affairs and Deputy Emergency Relief Coordinator, Kyung-Wha Kang: Security Council Briefing on Syria - New York, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">More than 55 responses in January, 2015</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 6-->\n      <input type=\"radio\" name=\"river\" id=\"food-security\" class=\"accordion-set--check\"/>\n      <label for=\"food-security\" class=\"accordion-set--label\">Food Security</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Food Security</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">In Hama, Kirnaz city receives aid for the first time after two years</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 7-->\n      <input type=\"radio\" name=\"river\" id=\"health\" class=\"accordion-set--check\"/>\n      <label for=\"health\" class=\"accordion-set--label\">Health</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Health</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria’s Medical Community Under Assault</h3>\n\n              <div class=\"filters-content--item-source\">Physicians for Human Rights</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Palestinian refugee camps in Lebanon and Syria: Red Cross Red Crescent is calling for greater support for refugees</h3>\n\n              <div class=\"filters-content--item-source\">International Committee of the Red Cross, Palestine Red Crescent Society, International Federation of Red Cross And Red Crescent Societies</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Polio this week as of 25 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Global Polio Eradication Initiative</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 8-->\n      <input type=\"radio\" name=\"river\" id=\"logistics\" class=\"accordion-set--check\"/>\n      <label for=\"logistics\" class=\"accordion-set--label\">Logistics</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Logistics</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">28 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Turkey | Syria: Border Crossings Status - 27 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria Crisis: Logistics Cluster Warehouse Capacity as of 23rd February 2015</h3>\n\n              <div class=\"filters-content--item-source\">World Food Programme, Logistics Cluster</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Assistant Secretary-General for Humanitarian Affairs and Deputy Emergency Relief Coordinator, Kyung-Wha Kang: Security Council Briefing on Syria - New York, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Office for the Coordination of Humanitarian Affairs</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">More than 55 responses in January, 2015</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 9-->\n      <input type=\"radio\" name=\"river\" id=\"nutrition\" class=\"accordion-set--check\"/>\n      <label for=\"nutrition\" class=\"accordion-set--label\">Nutrition</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Nutrition</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">In Hama, Kirnaz city receives aid for the first time after two years</h3>\n\n              <div class=\"filters-content--item-source\">Syrian Arab Red Crescent</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">26 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Implementation of Security Council resolutions 2139 (2014), 2165 (2014) and 2191 (2014) - Report of the Secretary-General (S/2015/124) [EN/AR]</h3>\n\n              <div class=\"filters-content--item-source\">UN Security Council</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n      <!--Item 10-->\n      <input type=\"radio\" name=\"river\" id=\"protection\" class=\"accordion-set--check\"/>\n      <label for=\"protection\" class=\"accordion-set--label\">Protection</label>\n      <div class=\"accordion-set--content\">\n        <div class=\"widget-river--filters-content\">\n          <h2 class=\"filters-content--title\">Protection</h2>\n          <ul class=\"filters-content--items\">\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Emergencies updates: 6 to 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">Oxfam</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Car bomb kills 11 outside Damascus: monitor</h3>\n\n              <div class=\"filters-content--item-source\">Agence France-Presse</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">Syria’s war continues ‘unabated and with total impunity,’ Security Council told</h3>\n\n              <div class=\"filters-content--item-source\">UN News Service</div>\n            </li>\n            <li class=\"filters-content--item\">\n              <div class=\"filters-content--item-date\">27 February 2015</div>\n              <h3 class=\"filters-content--item-title\">The crisis in Yarmouk Camp, 26 February 2015</h3>\n\n              <div class=\"filters-content--item-source\">UN Relief and Works Agency for Palestine Refugees in the Near East</div>\n            </li>\n          </ul>\n          <a class=\"filters-content--more btn\" href=\"\">View full list on ReliefWeb</a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n";
},"useData":true});
})();
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var WidgetBase = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null).helpers.widgetBase;
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

// load templates
require('./river.hbs.js');
require('./river-item.hbs.js');

var RiverWidget = function(opts) {
  var config = {
    title: "More From Reliefweb",
    template: "river.hbs"
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

RiverWidget.prototype = new WidgetBase();

RiverWidget.prototype.compile = function(elements, next) {
  var widget = this;

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  widget.template(function(content) {
    elements
      .classed('rw-widget', true)
      .html(content);

    next();
  });

  function titleAdjust(title) {
    var snippet = '<span class="word[[counter]]">[[word]]</span>';
    var words = title.split(' ');
    var adjustedTitle = '';

    adjustedTitle = snippet.replace('[[counter]]', 1).replace('[[word]]', words.shift());
    adjustedTitle += snippet.replace('[[counter]]', 2).replace('[[word]]', words.join(' '));

    return adjustedTitle;
  }
};

RiverWidget.prototype.link = function(elements, next) {

  var $element = $(elements[0][0]);
  var widget = this;
  var content = widget.config('content');
  var rw = reliefweb.client();

  function init() {
    paint();
  }

  function paint(updatedContent) {
    rw.post('reports')
      .send({'limit': 4})
      .send({
        'fields': {
          'include': ["title", "source", "date"]
        }
      })
      .sort('date.created', 'desc')
      .end(function(err, res) {
        if (!err) {
          var data = _.map(res.body.data, function(n) {
            return {
              item_date: moment(n.fields.date.created, moment.ISO_8601).format('DD MMMM YYYY'),
              item_title: n.fields.title,
              item_source: n.fields.source[0].name
            };
          });

          var count = 0;

          var items = _.reduce(data, function(acc, value) {
            return acc + Handlebars.templates['river-item.hbs'](value);
          }, '');

          $('.filters-content--items', $element).empty().html(items);
        }
      });
  }

  init();
};

RiverWidget.prototype.getData = function(period, updatePage) {
  var widget = this;
  var currentDate = moment().utc().format();
  var fromDate = moment().utc().subtract(1, period).format();
  var countries = widget.config('countries');
  var content = widget.config('content');

  var interval = "day";
  if (period == "years") {
    interval = "month";
  }

  widget.config('timePeriod', {
    duration: period,
    startDate: moment(fromDate, moment.ISO_8601).utc().format("MM-DD-YYYY"),
    endDate: moment(currentDate, moment.ISO_8601).utc().format("MM-DD-YYYY")
  });

  var factets = {
    facets: [
      {
        "field": "date.created",
        "interval": interval
      }
    ]
  };

  var count = 0;
  var rw = reliefweb.client();
  content.forEach(function(val, key) {

    var type;
    var filters = {
      filter: {
        'operator': 'AND',
        'conditions': [
          {
            "field": "date.created",
            "value": {
              "from": fromDate,
              "to": currentDate
            }
          }
        ]
      }
    };

    if (Array.isArray(countries) && countries.length) {
      filters.filter.conditions.push({
        'field': 'country.name',
        'value': countries,
        'operator': 'OR'
      });
    }

    if (val.type == "maps") {
      type = "reports";
      filters.filter.conditions.push({
        "field": "format.name",
        "value": ["Map", "Infographic"],
        "operator": "OR"
      });
    }
    else {
      type = val.type;
    }

    rw.post(type)
      .send({preset: "analysis", limit: 0})
      .send(factets)
      .send(filters)
      .sort('date.created', 'asc')
      .end(function(err, res) {
        if (!err) {
          count++;
          // TODO: Check to make sure values exists before setting.
          content[key].count = res.body.totalCount;
          content[key].graphData = res.body.embedded.facets["date.created"].data;
          if (count == content.length) {
            updatePage(content);
          }
        }
      });
  });
};

module.exports = RiverWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./river-item.hbs.js":5,"./river.hbs.js":6}],8:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "              <li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                <div class=\"timeline-widget-dropdown--item\">\n                  <div class=\"timeline-widget-dropdown--item-date\">"
    + alias3(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-day","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-month'] || (depth0 != null ? depth0['date-month'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-month","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-year'] || (depth0 != null ? depth0['date-year'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-year","hash":{},"data":data}) : helper)))
    + "</div>\n                  <div class=\"timeline-widget-dropdown--item-desc\">"
    + alias3(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short-desc","hash":{},"data":data}) : helper)))
    + "</div>\n                </div>\n              </li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "          <li class=\"timeline-widget-item\">\n            <div class=\"timeline-widget-item--header\">\n              <div class=\"timeline-widget-item--headline\">\n                <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias2(alias1((depth0 != null ? depth0['date-full'] : depth0), depth0))
    + "</div>\n              </div>\n              <h1 class=\"timeline-widget-item--title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n            </div>\n            <div class=\"timeline-widget-item--content\">\n                  <div class=\"timeline-widget-item--image\">\n                    <div class=\"timeline-widget-item--image--icons\">\n                      <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n                      <a class=\"timeline-widget-item--image--country\">"
    + alias2(alias1((depth0 != null ? depth0.country : depth0), depth0))
    + "</a>\n                    </div>\n                    <img src=\""
    + alias2(alias1((depth0 != null ? depth0['img-src'] : depth0), depth0))
    + "\" />\n                  </div>\n              <div class=\"timeline-widget-item--description\">\n                  "
    + ((stack1 = alias1((depth0 != null ? depth0['long-desc'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                <div class=\"timeline-widget-item-link\">\n                  <a class=\"btn\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n                </div>\n              </div>\n            </div>\n          </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "<div class=\"timeline-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-product_type_calendar widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"timeline-widget--controls\">\n    <button class=\"prev\"><div class=\"arrow\"></div></button>\n    <button class=\"next\"><div class=\"arrow\"></div></button>\n  </div>\n\n  <div class=\"timeline-widget--dropdown\">\n    <div class=\"timeline-widget--dropdown-heading\">\n      <span class=\"button-arrow\"></span> Timeline - Calendar</div>\n    <div class=\"clear\"></div>\n    <div class=\"timeline-widget--dropdown--wrapper\">\n      <div class=\"timeline-widget--dropdown-controls\">\n        <div class=\"form-select\">\n          <select name=\"year\">\n          </select>\n        </div>\n        <div class=\"form-select\">\n          <select name=\"month\">\n          </select>\n        </div>\n        <button class=\"form-today\">Today</button>\n        <span class=\"close\"></span>\n      </div>\n      <div class=\"timeline-widget--dropdown--container\">\n        <ul class=\"slidee\">\n";
  stack1 = ((helper = (helper = helpers['timeline-items'] || (depth0 != null ? depth0['timeline-items'] : depth0)) != null ? helper : alias1),(options={"name":"timeline-items","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers['timeline-items']) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          <li class=\"timeline-widget--dropdown--end-of-line\">No More Entries</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"timeline-widget--frames\">\n    <ul class=\"slidee\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['timeline-items'] : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </div>\n  <div class=\"clear-both\"></div>\n</div>";
},"useData":true});
})();
},{}],9:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var WidgetBase = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null).helpers.widgetBase;
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);

// load template

require('./timeline.hbs.js');

var TimelineWidget = function(opts) {
  var config = {
    title: "Crisis Timeline",
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

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  var countries = widget.config('countries');
  var disaster = widget.config('disaster');
  var startDate = moment(widget.config('startDate'), moment.ISO_8601).utc().format();
  var limit = 10;

  if (widget.has('limit')) {
    limit = widget.config('limit');
  }

  var filters = {
      filter: {
      'operator': 'AND',
      'conditions': [
        {
          'field': 'headline.featured'
        },
        {
          "field": "date.original",
          "value": {
            "from":  startDate
          }
        }
      ]
    }
  };

  if (Array.isArray(countries) && countries.length) {
    filters.filter.conditions.push({
      'field': 'country',
      'value': countries,
      'operator': 'OR'
    });
  }

  if (Array.isArray(disaster) && disaster.length) {
    filters.filter.conditions.push({
      'field': 'disaster',
      'value': disaster,
      'operator': 'OR'
    });
  }

  var rw = reliefweb.client();
  rw.post('reports')
    .fields(['date', 'headline', 'primary_country', 'url'], [])
    .sort('date.original', 'asc')
    .send(filters)
    .send({limit: limit})
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

  function titleAdjust(title) {
    var snippet = '<span class="word[[counter]]">[[word]]</span>';
    var words = title.split(' ');
    var adjustedTitle = '';
    for (var i = 0; i < words.length; i++) {
      adjustedTitle += snippet.replace('[[counter]]', i + 1).replace('[[word]]', words[i]);
    }
    return adjustedTitle;
  }
};

TimelineWidget.prototype.link = function(elements) {
  var timelineState = {};
  var timelineContent = this.config('timeline-items');

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
      $item,
      margin;

  var $sly,
      $slyDropdown;

  // Open links in a new tab.
  $('.timeline-widget-frames li a').attr('target', '_blank');

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
    $frame = $('.timeline-widget--frames', $element);
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
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      scrollBy: 1,
      startAt: timelineState.currentIndex,
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
  }

  function slideTo(index) {
    var $sliderPos = $sly.getPos(index);
    $sly.slideTo($sliderPos.center);
    $sly.activate(index);

    var $dropDownPos = $slyDropdown.getPos(index);
    $slyDropdown.slideTo($dropDownPos.start);
    $slyDropdown.activate(index);
  }

  function adjustTimelineWidth(width) {
    // Fix for iOS mobile browser. For some reason, Sly will cause the browser window to dramatically
    // increase in width. This interacts poorly with our implementation of pym.js, which causes a feedback
    // loop in which the widget gets scaled to infinite width.
    if (window.screen.width < width) {
      width = window.screen.width;
    }

    $('timeline-widget', $element).width(width);
    $item.width(width);

    setTimeout(function() {
      $sly.reload();
    }, 1);
  }

  init();

  $('.timeline-widget-dropdown--list-item', $element).click(function(){
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

  $('.form-today', $element).click(function() {
    timelineState.currentIndex = findClosestTimelineContent();
    paint();
  });

  // Update other sliders based on main.
  $sly.on('moveStart', function(){
    timelineState.currentIndex = $sly.rel.activeItem;
    paint();
  });
};

module.exports = TimelineWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./timeline.hbs.js":8}],10:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

var BeatBlocks = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null);

// Widgets
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river.ver2/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

BeatBlocks.addWidgetToRegistry('crisis-overview', CrisisOverviewWidget);
BeatBlocks.addWidgetToRegistry('river', RiverWidget);
BeatBlocks.addWidgetToRegistry('timeline', TimelineWidget);
BeatBlocks.addWidgetToRegistry('financial', FinancialWidget);

module.exports = {};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/crisis-overview/crisis-overview":2,"./components/financial/financial":4,"./components/river.ver2/river":7,"./components/timeline/timeline":9}]},{},[10]);
