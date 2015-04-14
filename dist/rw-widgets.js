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
var numeral = (typeof window !== "undefined" ? window.numeral : typeof global !== "undefined" ? global.numeral : null);
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

  if (this.has('map.src') && this.has('environment.content')) {
    this.config('map.src', this.config('environment.content') + this.config('map.src'));
  } else {
    console.log('Please verify that the "map.src" and "baseUrl" parameters are set in your config file.');
  }

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
    + "</h1>\n  </div>\n  <div class=\"financial-widget--percent-funded\">\n    <div class=\"financial-widget--percent-funded--amount covered\">$2.12B Funded <span class=\"percent\">57% <span>covered</span></span>\n    </div>\n    <div class=\"financial-widget--percent-funded--amount requested \">$3.74B Requested</div>\n  </div>\n  <div class=\"financial-widget--cluster-funding\">\n    <h2>Requirements &amp; Funding Per Cluster</h2>\n    <div id=\"finance-bubbles\"></div>\n  </div>\n  <footer class=\"financial-widget--explore\"><a href=\""
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
    $.each(val.clusters.content, function() {
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

  var labelMapping = widget.config('labelMapping');

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

    setTitle($('.financial-widget--data-source', $element).first().text());

    $('.financial-widget--data-source', $element).click(function(e) {
      e.preventDefault();
      var selected = this.text;
      chartState.currentSection = _.findKey(config.dataSources, function(val) {return val.dataItemTitle == selected;});

      if (config.dataSources[chartState.currentSection].clusters.content.length < 2) {
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
    var sampleData = config.dataSources[chartState.currentSection].clusters.content;

    $('#finance-bubbles', $element).empty();

    if (sampleData.length <= 1) {
      return;
    }

    var margin = {top: 50, bottom: 50, left: 20, right: 20},
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
      .range(bubblePlacementRange)
      .clamp(true);

    var bubbleNeedsSmallClass = function(d) {
      return d.r < 50;
    };

    var windowResize = function() {
      var axisSwitch = false,
        oldDirection = chartState.direction;

      w = $('#finance-bubbles', $element).width();
      svg.attr("width", w);
      w = w - margin.left - margin.right;

      chartState.direction = ($('#finance-bubbles', $element).width() > 650) ? 'horizontal' : 'vertical';

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

      // Offset y-axis tick labels.
      $('.axis.y .tick text').attr("transform", "translate(0, -10)");

      var labelx = w/2 - 52;
      var trianglex = labelx + 110;
      if (chartState.direction == 'horizontal') {
        bubblePlacementScale.range([0, w]);
        canvas.select(".grid.x").style('display', 'block').call(gridXAxis);
        canvas.select(".axis.x-top").style('display', 'block').call(xAxisTop);
        canvas.select(".axis.x").attr("transform", "translate(0," + h + ")").style('display', 'block').call(xAxis);
        canvas.select(".label.x-top").attr("transform", "translate(" + labelx + ",-30)").style('display', 'block');
        canvas.select(".label.x-bottom").attr("transform", "translate(" + labelx + "," + (h + 45) + ")").style('display', 'block');
        canvas.select(".triangle.triangle-top").attr("transform", "translate(" + trianglex + ", -43)").style('display', 'block');
        canvas.select(".triangle.triangle-bottom").attr("transform", "translate(" + trianglex + "," + (h + 32) + ")").style('display', 'block');
        canvas.select(".axis.y").style('display', 'none');
        canvas.select(".grid.y").style('display', 'none');
      } else {
        bubblePlacementScale.range([h, 0]);
        canvas.select(".axis.x-top").style('display', 'none');
        canvas.select(".axis.x").style('display', 'none');
        canvas.select(".grid.x").style('display', 'none');
        canvas.select(".label.x-top").style('display', 'none');
        canvas.select(".label.x-bottom").style('display', 'none');
        canvas.select(".triangle.triangle-top").style('display', 'none');
        canvas.select(".triangle.triangle-bottom").style('display', 'none');
        canvas.select(".axis.y").style('display', 'block').call(yAxis);
        canvas.select(".axis.y .domain").style('display', 'none');
        canvas.select(".grid.y").style('display', 'block').call(gridYAxis);
      }
    };

    $(window).resize(function() {
      windowResize();
    });

    var nodes = d3.range(sampleData.length).map(function(i) {
      var fundingPercentage = (sampleData[i].current_requirement) ? sampleData[i].funding / sampleData[i].current_requirement : 0;
      return {
        title: sampleData[i].name,
        fundingPercentage: fundingPercentage,
        requested: sampleData[i].current_requirement,
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
        if (d == 1) {
          return "100% Funded";
        } else {
          return (d * 100) + "%";
        }
      })
      .orient("right");

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
      .tickValues([0, 0.25, 0.5, 0.75, 1]);

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

    var labelx = w/2 - 52;
    var trianglex = labelx + 110;
    canvas.append("text")
      .classed({
        "x-top": true,
        "label": true
      })
      .attr("transform", "translate(" + labelx + ",-30)")
      .text("Per Cent Funded");

    canvas.append("path")
      .classed({
        "triangle": true,
        "triangle-top": true
      })
      .attr("transform", "translate(" + trianglex + ", -43)")
      .attr("d", "M0,16 L0,0 L12,8 L0,16 Z")
      .attr("fill", "#D8D8D8");

    canvas.append("text")
      .classed({
        "x-bottom": true,
        "label": true
      })
      .attr("transform", "translate(" + labelx + "," + (h + 45) + ")")
      .text("Per Cent Funded");

    canvas.append("path")
      .classed({
        "triangle": true,
        "triangle-bottom": true
      })
      .attr("transform", "translate(" + trianglex + "," + (h + 32) + ")")
      .attr("d", "M0,16 L0,0 L12,8 L0,16 Z")
      .attr("fill", "#D8D8D8");

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
      .text(function(d) {return shortClusterLabel(d.title);})
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
        k = e.alpha * 0.05;

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

        // Adjust here to help force bubbles towards the center.
        if (o.x + o.r > w) {
          o.x -= 1200 * k;
        } else if ((o.x - o.r < 0 && chartState.direction == 'horizontal') || (o.x - o.r < 40)) {
          o.x += 1200 * k;
        }

        if (o.y + o.r + 20 > h) {
          o.y -= 1200 * k;
        } else if (o.y - o.r < 0) {
          o.y += 1200 * k;
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

      var overlayMarkup = "<div id='detail-overlay'><div class='detail--block'><div class='detail--info'><div class='detail--text'><h2 class='detail--title'></h2></div></div></div></div>";
      var $overlay = $('#finance-bubbles', $element).append(overlayMarkup);

      $('.detail--info', $overlay).width((w < h) ? w - 80 : h - 20);
      $('.detail--info', $overlay).height((w < h) ? w - 80 : h - 20);

      $('.detail--title', $overlay).text(longClusterLabel(node.title));

      var icon = getClusterIcon(node.title);
      if (icon) {
        $('.detail--text', $overlay).prepend("<img class='detail--icon' src='images/financial-icon--" + icon + ".svg' />");
      }

      var $textContainer = $('.detail--text', $overlay);

      $textContainer.append("<div>" + percentageFormatter(node.fundingPercentage) + " funded" + "</div>");

      fundingPrefix = d3.formatPrefix(node.requested);
      $textContainer.append("<div>" + fundingPrefix.scale(node.requested).toFixed(2) + fundingPrefix.symbol + " Requested" + "</div>");

      fundingPrefix = d3.formatPrefix(node.funded);
      $textContainer.append("<div>" + fundingPrefix.scale(node.funded).toFixed(2) + fundingPrefix.symbol + " Funded" + "</div>");

      $('#detail-overlay', $overlay).append("<div class='detail--click'></div>")
        .click(removeClusterOverlay);
    }

    function removeClusterOverlay() {
      d3.select('#detail-overlay').remove();
    }

    function getClusterIcon(original) {
      var icon = _.result(_.find(labelMapping, function(item) {
        return item.original == original;
      }), 'icon');

      return (icon) ? icon : undefined;
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
    //var $yearSelector = $('select[name="time-chooser"]', $element);
    //// We are not pulling any 2015 data at this time. Start with 2014.
    //var currentYear = moment().subtract(1, "years").format('YYYY');
    //var selected = '';
    //for (var i = 0; i < 4; i++) {
    //  selected = (currentYear == 2015) ? 'selected' : '';
    //  $yearSelector.append('<option value="' + currentYear + '"' + selected + '>' + currentYear + '</option>');
    //  currentYear--;
    //}
    //$yearSelector.selectric();
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

    // Align the label to the right if the percentage is less than 20.
    if (percentage < 20) {
      $('.financial-widget--percent-funded--amount .percent').addClass('aligned-right');
    }
  }

  function setRequested(value) {
    $('.financial-widget--percent-funded .requested').html('$' + value + ' Requested');
  }

  function setBar(value) {
    var selectedSource = calculatedDataSources[value];
    setCovered(selectedSource.fundingTotal, selectedSource.percentageRaised);
    setRequested(selectedSource.currentRequirementTotal);
  }

  function longClusterLabel(original) {
    var mapped = _.result(_.find(labelMapping, function(item) {
      return item.original == original;
    }), "long");

    return (mapped) ? mapped : original;
  }

  function shortClusterLabel(original) {
    var mapped = _.result(_.find(labelMapping, function(item) {
      return item.original == original;
    }), "short");

    return (mapped) ? mapped : original;
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
templates['river.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "        <input type=\"radio\" name=\"river\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"accordion-set--check\" />\n        <label for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"accordion-set--label\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</label>\n        <div id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "-accordion\" class=\"accordion-set--content\">\n          <div class=\"widget-river--filters-content\">\n            <h2 class=\"filters-content--title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n            <ul class=\"filters-content--items\">\n            </ul>\n            <a class=\"filters-content--more btn\" href=\""
    + alias2(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"location","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">View full list on ReliefWeb</a>\n          </div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"widget-river\" id=\"widget-river\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-activity_reporting widget-title--icon\"></i>"
    + ((stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"adjustedTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span></h1>\n  <div class=\"widget-river--results clearfix\">\n\n    <div class=\"accordion-set widget-river--filters results--item--reports\">\n      <h5 class=\"widget-river--filters--title\">Filter Results:  <span class=\"tab\">Reports</span> <span class=\"close\"></span></h5>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
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

RiverWidget.prototype.link = function(elements) {

  var $element = $(elements[0][0]);
  var widget = this;
  var filters = widget.config('filters');
  var rw = reliefweb.client();

  function init() {
    filters.forEach(function(filter) {
      getDataAndRender(filter.id, filter.data.content);
    });

    $element.find('.accordion-set--label').click(function() {
      if ($(window).width() > 640 ) {
        // Accordion is absolutely positioned, which means it won't play well with pym.js.
        var that = this;
        setTimeout(function () {
          var $accordian = $('#' + $(that).attr('for') + '-accordion');
          var height = $accordian.find('.widget-river--filters-content').height() + 75;
          $('.widget-river--results').height(height);
        }, 1);
      }
    });

    accordion_set_add_active($('.accordion-set--check:checked'));
  }

  function getDataAndRender(filterId, filterData) {
    if (filterData) {
      var data = _.map(filterData.data, function(n) {
        return {
          item_date: moment(n.fields.date.created, moment.ISO_8601).format('DD MMMM YYYY'),
          item_title: n.fields.title,
          item_source: n.fields.source[0].shortname
        };
      });

      var count = 0;

      var items = _.reduce(data, function(acc, value) {
        return acc + Handlebars.templates['river-item.hbs'](value);
      }, '');

      $('#' + filterId + '-accordion .filters-content--items', $element).empty().html(items);
    }
  }

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

  init();
};

module.exports = RiverWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./river-item.hbs.js":5,"./river.hbs.js":6}],8:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline--dropdown-item.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-rw-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"timeline-widget-dropdown--item\">\n    <div class=\"timeline-widget-dropdown--item-date\">"
    + alias3(((helper = (helper = helpers['date-day'] || (depth0 != null ? depth0['date-day'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-day","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-month'] || (depth0 != null ? depth0['date-month'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-month","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['date-year'] || (depth0 != null ? depth0['date-year'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date-year","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"timeline-widget-dropdown--item-desc\">"
    + alias3(((helper = (helper = helpers['short-desc'] || (depth0 != null ? depth0['short-desc'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short-desc","hash":{},"data":data}) : helper)))
    + "</div>\n  </div>\n</li>";
},"useData":true});
})();
},{}],9:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline--frame-item.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=this.lambda;

  return "<li class=\"timeline-widget-item\" data-rw-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"timeline-widget-item--header\">\n    <div class=\"timeline-widget-item--headline\">\n      <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias1(alias2((depth0 != null ? depth0['date-full'] : depth0), depth0))
    + "</div>\n    </div>\n    <h1 class=\"timeline-widget-item--title\">"
    + alias1(alias2((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n  </div>\n  <div class=\"timeline-widget-item--content\">\n    <div class=\"timeline-widget-item--image\">\n      <div class=\"timeline-widget-item--image--icons\">\n        <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n        <a class=\"timeline-widget-item--image--country\">"
    + alias1(alias2((depth0 != null ? depth0.country : depth0), depth0))
    + "</a>\n      </div>\n      <img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0['img-src'] : depth0), depth0))
    + "\" />\n    </div>\n    <div class=\"timeline-widget-item--description\">\n      "
    + ((stack1 = alias2((depth0 != null ? depth0['long-desc'] : depth0), depth0)) != null ? stack1 : "")
    + "\n      <div class=\"timeline-widget-item-link\">\n        <a class=\"btn\" href=\""
    + alias1(alias2((depth0 != null ? depth0.url : depth0), depth0))
    + "\" target=\"_blank\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n      </div>\n    </div>\n  </div>\n</li>";
},"useData":true});
})();
},{}],10:[function(require,module,exports){
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['timeline.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "              <li class=\"timeline-widget-dropdown--list-item\" data-slide=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-rw-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
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
    var stack1, helper, alias1=this.escapeExpression, alias2=this.lambda;

  return "          <li class=\"timeline-widget-item\" data-rw-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"timeline-widget-item--header\">\n              <div class=\"timeline-widget-item--headline\">\n                <div class=\"timeline-widget-item--category\">Ocha <div class=\"arrow\"></div></div> <div class=\"timeline-widget-item--date\">"
    + alias1(alias2((depth0 != null ? depth0['date-full'] : depth0), depth0))
    + "</div>\n              </div>\n              <h1 class=\"timeline-widget-item--title\">"
    + alias1(alias2((depth0 != null ? depth0.title : depth0), depth0))
    + "</h1>\n            </div>\n            <div class=\"timeline-widget-item--content\">\n                  <div class=\"timeline-widget-item--image\">\n                    <div class=\"timeline-widget-item--image--icons\">\n                      <a class=\"timeline-widget-item--image--view-more\"><img src=\"../../images/eye-img--yellow.png\"></a>\n                      <a class=\"timeline-widget-item--image--country\">"
    + alias1(alias2((depth0 != null ? depth0.country : depth0), depth0))
    + "</a>\n                    </div>\n                    <img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0['img-src'] : depth0), depth0))
    + "\" />\n                  </div>\n              <div class=\"timeline-widget-item--description\">\n                  "
    + ((stack1 = alias2((depth0 != null ? depth0['long-desc'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                <div class=\"timeline-widget-item-link\">\n                  <a class=\"btn\" href=\""
    + alias1(alias2((depth0 != null ? depth0.url : depth0), depth0))
    + "\" target=\"_blank\"><span class=\"un-icon-product_type_report\"></span> Read full report</a>\n                </div>\n              </div>\n            </div>\n          </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "<div class=\"timeline-widget\">\n  <h1 class=\"widget-title\"><span><i class=\"un-icon-product_type_timeline widget-title--icon-custom widget-title--icon\"></i>"
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
},{}],11:[function(require,module,exports){
(function (global){
"use strict";

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);
var d3 = (typeof window !== "undefined" ? window.d3 : typeof global !== "undefined" ? global.d3 : null);
var WidgetBase = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null).helpers.widgetBase;
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);
var reliefweb = (typeof window !== "undefined" ? window.reliefweb : typeof global !== "undefined" ? global.reliefweb : null);
var Handlebars = (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null);

// load template
require('./timeline.hbs.js');
require('./timeline--frame-item.hbs.js');
require('./timeline--dropdown-item.hbs.js');

var TimelineWidget = function(opts) {
  var config = {
    title: "Crisis Timeline",
    template: "timeline.hbs",
    countries: [],
    limit: 100
  };

  opts = (opts) ? opts : {};

  config = _.defaults(opts, config);
  WidgetBase.call(this, config);
};

TimelineWidget.prototype = new WidgetBase();

TimelineWidget.prototype.getData = function(offset, updatePage) {
  var widget = this;

  // On offset "0" just use the data from configuration.
  if (offset === 0) {
    updateTimelineData(widget.config('items.content.data'), updatePage);
    return true;
  }

  // Remove v1/ from the configured path.
  var path = widget.config('items.path').split('/');
  path.shift();
  path = path.join('/');
  // Make the query more efficient by dropping facet parameter.
  var payload = widget.config('items.payload');
  delete payload.facets;
  // Override the API host, need to strip out the protocol as the library handles it.
  var rw = reliefweb.client({host: widget.config('environment.sources.reliefweb').replace(/.*?:\/\//g, "")});
  rw.post(path)
    .send(payload)
    .send({offset: offset})
    .end(function(err, res) {
      if (!err) {
        updateTimelineData(res.body.data, updatePage);
      }
    });

  function updateTimelineData(data, cb) {
    var timelineItems = _.map(data, function(item) {
      var returnItem = {
        title: item.fields.headline.title,
        country: item.fields.primary_country.name,
        "long-desc": item.fields.headline.summary,
        "short-desc": item.fields.headline.title,
        "url": item.fields.url,
        id: item.id
      };

      if (item.fields.headline.image) {
        returnItem["img-src"] = item.fields.headline.image['url-large'];
      } else if (widget.has('emptyImage') && widget.has('environment.content')) {
        returnItem["img-src"] = widget.config('environment.content') + widget.config('emptyImage');
      } else {
        console.log('Please verify that the "emptyImage" and "baseUrl" parameters are set in your config file.');
      }

      var time = moment(item.fields.date.original, moment.ISO_8601);
      returnItem['date-full'] = time.format('DD MMM YYYY');
      returnItem['date-month'] = time.format('MMMM');
      returnItem['date-day'] = time.format('DD');
      returnItem['date-year'] = time.format('YYYY');

      return returnItem;
    });

    cb(timelineItems);
  }
};

TimelineWidget.prototype.compile = function(elements, next) {
  var widget = this;

  var config = this.config();
  this.config('adjustedTitle', titleAdjust(config.title));

  var facets = widget.config('items.content.embedded.facets');
  widget.config('dataRanges', _.map(facets['date.original'].data, function(item) {
    return {
      count: item.count,
      value: moment(item.value, moment.ISO_8601())
    };
  }));

  widget.getData(0, function(timelineItems) {
    timelineItems.reverse();
    widget.config('timeline-items', timelineItems);

    widget.template(function(content) {
      elements
        .classed('rw-widget', true)
        .html(content);

      next();
    });
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
  var widget = this;

  var timelineState = {
    currentIndex: null,
    currentYear: null,
    currentMonth: null,
    currentFormatted: null,
    requestedDate: null,
    range: [0, 50],
    activeId: null
  };

  var timelineDataStore = {
    rangePerMonth: this.config('dataRanges'),
    content: this.config('timeline-items')
  };

  var $element = $(elements[0][0]); // @TODO, grab any potential element selected.
  var $frame,
    $item,
    margin;

  var $sly,
    $slyDropdown;

  // Open links in a new tab.
  $('.timeline-widget-frames li a').attr('target', '_blank');

  function findClosestTimelineContent(date) {
    var now = (date) ? date.unix() : moment().unix();
    var closestId;
    var closestIndexDistance;

    timelineDataStore.content.forEach(function(val, key) {
      var itemTime = moment(val['date-full'], 'DD MMM YYYY').unix();
      if (closestIndexDistance === undefined || Math.abs(now - itemTime) < closestIndexDistance) {
        closestIndexDistance = Math.abs(now - itemTime);
        closestId = val.id;
      }
    });

    return closestId;
  }

  function init() {
    timelineState.activeId = findClosestTimelineContent();
    var content = _.find(timelineDataStore.content, function(item) {
      return item.id == timelineState.activeId;
    });
    var now = moment(content['date-full'], 'DD MMM YYYY');
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

    $(window).on( "orientationchange", function(event) {
      adjustTimelineWidth($frame.width());
    });

    // Main slider.
    $sly = new Sly($frame, {
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 0,
      activateMiddle: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      speed: 200,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
      scrollHijack: 0,

      // Buttons
      prev: $('.prev'),
      next: $('.next')
    }).init();

    // Dropdowns.
    $slyDropdown = new Sly($('.timeline-widget--dropdown--container', $element), {
      itemNav: 'basic',
      smart: 0,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      scrollBy: 1,
      startAt: 0,
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }).init();

    // Fix for scrolling in iframe. The height of the container is set to 0 initially.
    setTimeout(function() {
      var $dropDownItem = $('.timeline-widget-dropdown--list-item[data-rw-id="' + timelineState.activeId + '"]');
      if ($dropDownItem) {
        var $dropDownPos = $slyDropdown.getPos($dropDownItem);
        $slyDropdown.slideTo($dropDownPos.center);
      }
    }, 750);

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
    lazyLoadImage();
    slideToById(timelineState.activeId);

    var content = _.find(timelineDataStore.content, function(item) {
      return item.id == timelineState.activeId;
    });
    var now = moment(content['date-full'], 'DD MMM YYYY');
    timelineState.currentYear = now.format('YYYY');
    timelineState.currentMonth = now.format('M');
    timelineState.currentFormatted = now.format('YYYY MMMM');

    $('select[name="month"]', $element).val(now.format('MMM')).selectric('refresh');
    $('select[name="year"]', $element).val(now.format('YYYY')).selectric('refresh');
  }

  function slideToById(id) {
    var $sliderItem = $('.timeline-widget-item[data-rw-id="' + id + '"]');
    if ($sliderItem) {
      var $sliderPos = $sly.getPos($sliderItem);
      $sly.activate($sliderItem);
      $sly.slideTo($sliderPos.center);
    }

    var $dropDownItem = $('.timeline-widget-dropdown--list-item[data-rw-id="' + id + '"]');
    if ($dropDownItem) {
      var $dropDownPos = $slyDropdown.getPos($dropDownItem);
      $slyDropdown.activate($dropDownItem, true);
      $slyDropdown.slideTo($dropDownPos.center);
    }
  }

  function adjustTimelineWidth(width) {
    // Fix for iOS mobile browser. For some reason, Sly will cause the browser window to dramatically
    // increase in width. This interacts poorly with our implementation of pym.js, which causes a feedback
    // loop in which the widget gets scaled to infinite width.

    // Do the orientation check to deal with safari not adjusting screen dimensions properly in iframe context.
    var overallWidth = 0;
    if (Math.abs(window.orientation) == 90) {
      // landscape
      overallWidth = (window.screen.width < window.screen.height) ? window.screen.height : window.screen.width;
      $('.timeline-widget', $element).width(overallWidth);
    } else if (window.orientation === 0) {
      // portrait
      overallWidth = (window.screen.width > window.screen.height) ? window.screen.height : window.screen.width;
      $('.timeline-widget', $element).width(overallWidth);
    }

    $item.width($frame.width());

    setTimeout(function() {
      $sly.reload();
      $slyDropdown.reload();
    }, 1);
  }

  init();

  $('.timeline-widget-dropdown--list-item', $element).click(function(){
    if ($(this).data('rwId') == $($slyDropdown.items[0].el).data('rwId')) {
      timelineState.activeId = $(this).data('rwId');
      lazyLoad();
    } else {
      timelineState.activeId = $(this).data('rwId');
      paint();
    }
    $('.timeline-widget--dropdown--wrapper').removeClass('open');
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

  $('.timeline-widget--dropdown-controls select', $element).on('change', function() {
    selectChange();
  });

  $('.next').on('click', function() {
    var $item = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"]');
    var activeIndex = $sly.getIndex($item);

    if (activeIndex < $sly.items.length - 1) {
      timelineState.activeId = $($sly.items[activeIndex + 1].el).data('rwId');
      paint();
    }
  });

  $(".prev").on("click", function() {
    var $item = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"]');
    var activeIndex = $sly.getIndex($item);

    if (activeIndex > 0) {
      timelineState.activeId = $($sly.items[activeIndex - 1].el).data('rwId');
      paint();
    }
  });

  function selectChange() {
    var currentString = $('select[name="month"]', $element).val() + ' ' + $('select[name="year"]', $element).val();

    var offset = findOffsetForTime(moment(currentString, 'MMM YYYY')) - 5;
    offset = (offset < 5) ? 0 : offset;

    widget.getData(offset, function(items) {
      var timelineItems = items.reverse();
      timelineDataStore.content = timelineItems;
      timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

      var newActive = findClosestTimelineContent(moment(currentString, 'MMM YYYY'));
      timelineState.activeId = newActive;

      renderTimelineDropdownItems();
      renderTimelineSlideItems();

      $sly.reload();
      $slyDropdown.reload();
      paint();
    });
  }

  $('.form-today', $element).click(function() {
    var now = moment();

    var offset = findOffsetForTime(now) - 5;
    offset = (offset < 5) ? 0 : offset;

    widget.getData(offset, function(items) {
      var timelineItems = items.reverse();
      timelineDataStore.content = timelineItems;
      timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

      var newActive = findClosestTimelineContent(now);
      timelineState.activeId = newActive;

      renderTimelineDropdownItems();
      renderTimelineSlideItems();

      $sly.reload();
      $slyDropdown.reload();
      paint();
    });
  });

  function lazyLoadImage() {
    var $headlineImage = $('.timeline-widget-item[data-rw-id="' + timelineState.activeId + '"] img').last();
    $headlineImage.attr('src', $headlineImage.data('src'));
  }

  function lazyLoad() {
    widget.getData(timelineState.range[1], function(timelineItems) {

      timelineState.range[1] += 50; // @TODO: Avoid hardcoded
      timelineItems = timelineItems.reverse();
      timelineDataStore.content = timelineItems.concat(timelineDataStore.content);
      timelineDataStore.content = _.uniq(timelineDataStore.content, 'id');

      renderTimelineDropdownItems();
      renderTimelineSlideItems();

      paint();
    });
  }

  function renderTimelineDropdownItems() {
    var timelineItems = '';

    timelineDataStore.content.forEach(function(item, i) {
      item.index = i;
      timelineItems += Handlebars.templates['timeline--dropdown-item.hbs'](item);
    });

    $('.timeline-widget--dropdown--container .timeline-widget-dropdown--list-item').remove();
    $('.timeline-widget--dropdown--container .timeline-widget--dropdown--end-of-line').first().before(timelineItems);

    $('.timeline-widget-dropdown--list-item', $element).click(function(){
      if ($(this).data('rwId') == $($slyDropdown.items[0].el).data('rwId')) {
        timelineState.activeId = $(this).data('rwId');
        lazyLoad();
      } else {
        timelineState.activeId = $(this).data('rwId');
        paint();
      }
      $('.timeline-widget--dropdown--wrapper').removeClass('open');
    });

    $slyDropdown.reload();
  }

  function renderTimelineSlideItems() {
    var timelineItems = '';

    timelineDataStore.content.forEach(function(item){
      timelineItems += Handlebars.templates['timeline--frame-item.hbs'](item);
    });

    $('.timeline-widget--frames .slidee', $element).empty().html(timelineItems);

    // Open links in a new tab.
    $('.timeline-widget-frames li a').attr('target', '_blank');

    $item = $('.timeline-widget-item', $element);
    $item.width($frame.width());
    $item.css({
      marginRight : margin
    });

    $sly.reload();
  }

  /**
   * Given data in timelineDataStore.rangePerMonth that's based on the facet return from
   * RW API, return the offset needed to load data starting at a particular time.
   *
   * @param date - Moment.js object.
   * @returns offset #, useful for getData
   */

  function findOffsetForTime(date) {
    var priorDates = _.filter(timelineDataStore.rangePerMonth, function(item) {
      return item.value.isAfter(date);
    });

    var sum = _.reduce(priorDates, function(sum, item) {
      return sum + item.count;
    }, 0);

    return sum;
  }
};

module.exports = TimelineWidget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./timeline--dropdown-item.hbs.js":8,"./timeline--frame-item.hbs.js":9,"./timeline.hbs.js":10}],12:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @file: Exposes various widgets and utilities to the global
 * context, mostly useful in a browser setting.
 */

var BeatBlocks = (typeof window !== "undefined" ? window.BeatBlocks : typeof global !== "undefined" ? global.BeatBlocks : null);
var numeral = (typeof window !== "undefined" ? window.numeral : typeof global !== "undefined" ? global.numeral : null);

// Widgets
var CrisisOverviewWidget = require('./components/crisis-overview/crisis-overview');
var RiverWidget = require('./components/river.ver2/river');
var TimelineWidget = require('./components/timeline/timeline');
var FinancialWidget = require('./components/financial/financial');

BeatBlocks.addWidgetToRegistry('crisis-overview', CrisisOverviewWidget);
BeatBlocks.addWidgetToRegistry('river', RiverWidget);
BeatBlocks.addWidgetToRegistry('timeline', TimelineWidget);
BeatBlocks.addWidgetToRegistry('financial', FinancialWidget);

// The Numeral library allows whole-language overrides. Using that to map our
// unit abbreviations to longer terms.
numeral.language('en-long', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'thousand',
    million: 'million',
    billion: 'billion',
    trillion: 'trillion'
  },
  ordinal: function (number) {
    var b = number % 10;
    return (~~ (number % 100 / 10) === 1) ? 'th' :
      (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
  },
  currency: {
    symbol: '$'
  }
});

module.exports = {};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/crisis-overview/crisis-overview":2,"./components/financial/financial":4,"./components/river.ver2/river":7,"./components/timeline/timeline":11}]},{},[12]);
