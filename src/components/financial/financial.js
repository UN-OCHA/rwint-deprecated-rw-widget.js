"use strict";

var _ = require('lodash');
var WidgetBase = require('beat-blocks').helpers.widgetBase;
var $ = require('jquery');
var d3 = require('d3');
var moment = require('moment');

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
      .range(bubblePlacementRange);

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
        } else if (o.x - o.r < 0) {
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

      var icon = getClusterIcon(node.title);
      var iconx = (w / 2) - 495;
      var icony = (h / 2) - 230;
      overlay.append("path")
        .classed("detail--icon", true)
        .attr("transform", "translate("+ iconx +"," + icony + ")")
        .attr("d", icon);

      var textContainer = overlay.append("g")
        .classed("detail--text", true);

      textContainer.append("text")
        .classed("detail--title", true)
        .attr({
          "text-anchor": "middle"
        })
        .text(longClusterLabel(node.title));

      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,40)"
        })
        .text(percentageFormatter(node.fundingPercentage) + " funded");

      fundingPrefix = d3.formatPrefix(node.requested);
      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,60)"
        })
        .text(fundingPrefix.scale(node.requested).toFixed(2) + fundingPrefix.symbol + " Requested");

      fundingPrefix = d3.formatPrefix(node.funded);
      textContainer.append("text")
        .attr({
          "text-anchor": "middle",
          "transform": "translate(0,80)"
        })
        .text(fundingPrefix.scale(node.funded).toFixed(2) + fundingPrefix.symbol + " Funded");

      var bbox = textContainer.node().getBBox(),
        xTrans = ((w / 2)) + 10,
        yTrans = ((h / 2) - (bbox.height / 2) + margin.top) + 10;

      textContainer.attr({
        "transform": "translate(" + xTrans + "," + yTrans + ")"
      });

      textContainer.selectAll("text")
        .call(wrap, 300);

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

    function getClusterIcon(original) {
      //var icons = {
      //  "FOOD SECURITY": "M519.606974,145.867632 C520.623238,140.230119 520.547705,134.935937 520.547705,130.850285 L520.348572,121.195785 C520.341705,121.188919 520.259306,124.883172 520.176906,130.829685 C520.06704,134.963404 519.998373,140.298785 518.892844,145.936299 C517.718648,146.828962 515.912721,148.319024 514.882724,151.752345 C514.855258,151.869078 514.841524,151.972078 514.814058,152.081944 C516.372786,151.937745 517.883447,151.759212 519.366642,151.553213 C519.847307,149.026288 519.634441,147.165428 519.606974,145.867632 M480.556377,143.718373 C475.138596,140.243852 471.602275,138.485992 471.609142,138.479125 C471.602275,138.485992 475.02873,140.415518 480.322912,144.054839 C483.399167,146.169765 487.141488,148.964488 491.453739,151.827878 C491.989337,151.889678 492.531802,151.930878 493.0674,151.985811 C488.212684,148.930155 484.003432,145.929432 480.556377,143.718373 M511.950668,152.054478 C511.284603,151.003881 510.584206,150.234817 509.883808,149.651153 C509.650343,149.005688 509.403143,148.40829 509.155944,147.872692 C510.666606,149.417687 512.081134,150.186751 512.602999,150.612483 L512.602999,150.358417 C512.795265,150.962681 512.960064,151.587546 513.145464,152.21241 C513.426996,152.184944 513.715395,152.17121 513.990061,152.150611 C513.475063,150.365283 512.898265,148.634889 512.266533,146.993762 C512.046801,146.114832 511.682869,145.146635 511.099204,144.116639 C510.543006,142.818843 509.986808,141.582847 509.437477,140.401785 C510.110408,140.86185 510.659739,141.170849 510.934405,141.390581 C510.845138,140.449851 511.071738,137.737528 508.860679,134.640672 C507.56975,132.827878 506.175821,132.017614 505.035959,131.578149 L501.533971,124.766439 C501.527104,124.766439 502.666967,127.252164 504.64456,131.43395 C504.349294,131.344683 504.074629,131.262283 503.834296,131.193617 C501.142572,127.252164 499.013913,123.502977 497.207986,120.687654 C494.626128,116.670668 492.779001,114.390942 492.792735,114.384076 C492.785868,114.397809 494.495662,116.759934 496.947054,120.85932 C498.622514,123.68151 500.627574,127.416964 503.230032,131.358416 C503.696963,132.580679 504.150162,134.462139 505.928622,136.968464 C506.759486,138.142659 507.645283,139.00099 508.44868,139.653321 C508.750812,140.346852 509.073545,141.060983 509.382543,141.80258 C507.878749,140.285052 506.361221,139.79752 505.331224,139.495388 C505.035959,139.035323 504.754426,138.582125 504.472894,138.128926 C502.735633,134.407206 500.874773,131.118084 499.316045,128.378294 C495.875857,122.369981 493.644198,118.689461 493.657932,118.689461 L498.91778,128.543093 C499.316045,129.28469 499.728044,130.088088 500.167509,130.905218 C499.590711,129.916421 499.04138,128.989425 498.526381,128.137961 C495.848391,123.798243 493.905131,121.346851 493.918864,121.333118 C493.905131,121.346851 495.704191,123.894376 498.237982,128.316494 C499.721177,130.925818 501.444704,134.25614 503.587097,137.840527 C504.527827,139.934853 505.427357,142.159645 506.217021,144.501171 C506.004155,144.988702 505.756956,145.579233 505.54409,146.286498 C503.175098,142.228312 501.252438,138.479125 499.528911,135.588268 C498.972713,134.626938 498.457715,133.789208 497.97705,133.006411 C495.807191,128.54996 493.328333,124.718373 491.33014,121.63525 C487.841885,116.251802 485.589626,112.928347 485.596493,112.928347 L490.979941,121.813783 C493.287133,125.631636 496.308456,130.527553 498.636248,136.240599 C498.093783,137.716928 497.297252,140.106519 498.471448,143.78704 C499.885977,148.277824 502.591434,150.296617 503.415431,151.182414 C503.490964,150.173017 504.335561,147.460694 503.339898,143.615374 C503.957896,144.775836 504.610227,145.970632 505.317491,147.192895 C505.022225,148.579956 504.953559,150.317217 505.489157,152.535143 C507.720816,152.514543 509.918142,152.43901 512.074267,152.29481 C512.026201,152.21241 511.998734,152.136877 511.950668,152.054478 M476.395192,145.785233 C476.388325,145.798966 479.237982,147.412627 483.694433,150.557549 C484.003432,150.626216 484.319298,150.694882 484.64203,150.756682 C479.649981,147.440094 476.388325,145.792099 476.395192,145.785233 M501.389771,123.097845 C501.84297,124.237708 502.296168,125.974969 504.012829,128.261561 C505.928622,130.843418 508.112215,131.777282 508.778279,132.257947 C508.668413,131.39275 508.798879,128.886425 506.683953,126.057368 C504.939826,123.736443 503.092699,123.221445 501.932236,122.939912 C499.350378,119.307458 497.317852,115.860404 495.594325,113.264813 C493.1292,109.549959 491.385073,107.4419 491.39194,107.435033 C491.385073,107.4419 493.005601,109.632359 495.353992,113.422746 C496.960787,116.025203 498.87658,119.472258 501.389771,123.097845 M504.012829,103.919312 C503.463497,104.757043 502.632634,106.130371 502.769967,108.574896 C502.975966,111.561886 504.308095,113.175547 504.672027,113.827878 C504.871159,113.182413 505.914889,111.431419 505.722623,108.636696 C505.592157,106.144104 504.823093,104.715843 504.452294,103.69958 C503.868629,99.8817263 502.749367,96.5102047 501.932236,93.8871472 L499.927176,87.7071687 C499.92031,87.7003021 500.565774,90.1104937 501.691904,93.9420803 C502.440368,96.6269376 503.484097,100.067126 504.012829,103.919312 M501.794903,119.575258 C503.614564,121.923649 505.653956,122.754513 506.278821,123.180245 C506.162088,122.390581 506.230754,120.083389 504.225695,117.494665 C502.584567,115.386606 500.854173,114.92654 499.782977,114.679341 C497.338452,111.362753 495.408926,108.190364 493.781531,105.800772 C491.453739,102.381184 489.826345,100.451658 489.826345,100.437924 C489.826345,100.451658 491.35074,102.463584 493.561799,105.951838 C495.086193,108.34143 496.898987,111.513819 499.274845,114.837274 C499.721177,115.874137 500.174376,117.474065 501.794903,119.575258 M498.389048,103.788846 C499.213046,105.780172 500.565774,106.50117 501.224972,107.112301 C501.362305,106.391304 502.275568,104.860042 501.341705,102.59405 C500.517708,100.705723 499.123779,99.9435261 498.423382,99.5589941 C495.024394,91.7859545 491.426273,86.1347076 490.602276,84.8025789 L490.423743,84.5004466 C490.36881,84.5210465 494.227863,90.968824 498.045716,100.005326 C497.908383,100.83619 497.709251,102.236985 498.389048,103.788846 M496.93332,106.556103 C497.352185,107.510566 497.777917,108.986895 499.316045,110.882088 C501.012106,113.038214 502.900433,113.766078 503.484097,114.15061 C503.353631,113.429612 503.374231,111.32842 501.506504,108.966295 C499.954643,107.050501 498.389048,106.631636 497.400252,106.411903 C495.120527,103.383714 493.328333,100.472258 491.783338,98.2955318 C489.627212,95.1506094 488.075351,93.3996156 488.095951,93.3858823 C488.075351,93.3996156 489.537946,95.2261425 491.577339,98.425998 C493.019334,100.616457 494.715395,103.527914 496.93332,106.556103 M513.873328,150.523216 C514.395193,149.754152 516.427719,147.900159 517.279183,144.130372 C518.02078,140.786317 517.546982,138.595858 517.416515,137.112663 C518.027647,131.811615 517.711781,126.901965 517.471449,123.104712 C517.114383,117.570198 516.812251,114.13001 516.812251,114.13001 L517.128116,123.097845 C517.251716,126.950032 517.450849,131.914615 516.757318,137.215663 C515.713588,138.128926 514.09306,139.618988 513.385796,142.894376 C512.506866,146.877029 513.639862,149.51382 513.873328,150.523216 M507.899349,111.980751 C507.226418,112.839081 506.196421,114.274209 506.168955,116.945333 C506.127755,120.200122 507.473617,122.067849 507.823816,122.816313 C508.084748,122.122782 509.34821,120.316855 509.38941,117.261199 C509.423743,114.535142 508.730212,112.921481 508.393747,111.788485 C508.057281,107.572366 507.123418,103.809446 506.402421,100.891123 L504.672027,93.9901468 L506.134621,100.932323 C506.766353,103.919312 507.624683,107.744032 507.899349,111.980751 M511.29147,120.234455 C510.501806,121.120252 509.279544,122.589714 509.046078,125.48057 C508.764546,128.989425 510.062341,131.111217 510.385073,131.948948 C510.735272,131.221084 512.239067,129.36709 512.520599,126.071102 C512.760932,123.125312 512.115467,121.312518 511.840802,120.062789 C511.785868,115.475872 511.023671,111.32842 510.446873,108.114831 L509.032345,100.513457 L510.165341,108.135431 C510.639139,111.410819 511.31207,115.626938 511.29147,120.234455 M514.209793,128.652959 C513.29653,129.552489 511.875135,131.042551 511.421936,134.13254 C510.852005,137.888594 512.094867,140.264452 512.3764,141.184582 C512.808998,140.442985 514.573725,138.568391 515.11619,135.025204 C515.589988,131.873415 515.020057,129.875222 514.814058,128.50876 C515.068124,123.55791 514.511926,119.032793 514.099927,115.523938 C513.481929,110.415156 513.035597,107.235901 513.042464,107.235901 L513.784061,115.530805 C514.099927,119.101459 514.546259,123.695243 514.209793,128.652959 M482.362304,120.85932 C482.073905,122.177715 481.682507,124.299508 483.117635,127.286497 C484.848029,130.953285 487.395554,132.347213 488.192084,132.999544 C488.130284,132.093147 488.562883,129.42889 486.942355,125.988702 C485.486627,122.939912 483.804299,121.484184 482.815503,120.392388 C480.123779,115.860404 476.99259,112.138684 474.589265,109.24096 L468.862485,102.429251 L474.314599,109.42636 C476.669858,112.433949 479.73238,116.265536 482.362304,120.85932 M466.946692,120.419855 C467.949221,121.271318 469.24015,122.69958 472.02114,124.031709 C475.117996,125.569837 477.672387,125.411904 478.537584,125.549237 C477.99512,124.807639 476.862124,122.459247 473.463135,120.770053 C470.654679,119.431058 468.635886,119.767524 467.393023,120.021589 C463.149438,117.824264 459.516984,115.475872 456.584928,113.841611 C452.416876,111.431419 449.697685,110.26409 449.704552,110.250357 C449.697685,110.26409 452.355076,111.561886 456.426995,114.102543 C459.249185,115.791737 462.764906,118.174462 466.946692,120.419855 M467.084024,116.588268 C469.109684,118.394195 471.032344,118.497195 472.117273,118.85426 C471.883808,117.97533 472.089807,115.791737 469.782615,113.745478 C467.818755,112.056284 465.827429,111.918951 464.811166,111.843418 C456.708527,104.901242 449.526019,100.437924 447.864291,99.3735947 L447.500359,99.1263956 C447.43856,99.1881954 455.355799,104.399977 464.625766,112.536949 C464.921032,113.539479 465.463497,115.201206 467.084024,116.588268 M474.1292,128.460693 C475.207263,129.394557 476.594325,130.960151 479.588181,132.457079 C482.939102,134.15314 485.706359,134.036407 486.647089,134.201207 C486.084025,133.377209 484.896096,130.761019 481.201842,128.900158 C478.180519,127.389497 475.976327,127.774029 474.623598,128.034961 C470.043547,125.58357 466.108961,123.029179 462.957172,121.195785 C458.445788,118.572728 455.520598,117.247466 455.534331,117.233732 C455.520598,117.254332 458.370255,118.716927 462.785506,121.470451 C465.827429,123.365644 469.624682,125.974969 474.1292,128.460693 M481.043909,136.618265 C482.183772,137.634528 483.653233,139.351189 486.853089,141.033516 C490.444343,142.928709 493.438199,142.860043 494.440729,143.052309 C493.850198,142.152779 492.627935,139.275655 488.672749,137.201929 C485.431694,135.505869 483.048969,135.876667 481.579507,136.151333 C476.683591,133.425276 472.474339,130.623686 469.102817,128.598026 C464.261834,125.714036 461.123779,124.258308 461.144378,124.244575 C461.130645,124.258308 464.179435,125.871969 468.903685,128.900158 C472.151607,130.987618 476.223526,133.851008 481.043909,136.618265 M490.725875,128.337094 C490.313877,129.731022 489.723345,131.997014 491.048607,135.334203 C492.641669,139.412988 495.285326,141.109049 496.102456,141.878113 C496.109323,140.889317 496.795987,138.053393 495.305926,134.221806 C493.973797,130.815952 492.25027,129.119891 491.261473,127.870162 C488.679616,122.768246 485.548427,118.531528 483.131368,115.235539 L477.377122,107.469366 L482.822369,115.407205 C485.163895,118.826794 488.219551,123.180245 490.725875,128.337094 M487.656486,144.885703 C488.865015,146.018699 490.396276,147.886425 493.788398,149.774752 C497.592518,151.896545 500.806107,151.896545 501.891036,152.143744 C501.279905,151.148081 500.050776,148.003158 495.848391,145.675366 C492.401336,143.773306 489.826345,144.144105 488.240151,144.405038 C483.042102,141.376848 478.585651,138.286859 474.98753,136.068933 C469.851281,132.903411 466.514093,131.28975 466.527826,131.28975 C466.514093,131.296617 469.762015,133.06821 474.788397,136.391666 C478.242319,138.678258 482.540837,141.816313 487.656486,144.885703 M473.531802,113.848478 C473.373869,115.07074 473.174736,117.027733 474.678531,119.69199 C476.546258,122.919313 478.928983,124.031709 479.71178,124.58104 C479.581314,123.750176 479.807913,121.264452 478.056919,118.243129 C476.546258,115.530805 474.898264,114.322276 473.923201,113.388412 C471.16281,109.412626 468.052221,106.226504 465.683229,103.713313 L460.038849,97.8492 C460.025116,97.8492 462.064509,100.197592 465.449763,103.905579 C467.763822,106.514903 470.833211,109.817758 473.531802,113.848478 M550.4794,144.837636 L550.493133,144.837636 C550.197868,152.43901 547.609143,160.685847 543.633357,168.280354 C543.633357,168.280354 534.143657,187.500087 504.349294,187.500087 C474.548065,187.500087 464.893565,168.45202 464.893565,168.45202 C460.910913,160.809447 458.493854,152.624409 458.191722,144.837636 L458.219189,144.837636 C458.198589,144.631637 458.191722,144.439371 458.191722,144.233372 C458.191722,140.580318 460.450848,137.16073 464.344234,134.201207 L468.498553,136.858597 C465.930428,138.582125 464.440367,140.504785 464.440367,142.551044 C464.440367,149.747286 482.307371,155.583932 504.349294,155.583932 C526.384351,155.583932 544.251355,149.747286 544.251355,142.551044 C544.251355,137.572728 535.681785,133.246743 523.102096,131.049418 L523.157029,125.823902 C539.259306,128.975691 550.5,136.020867 550.5,144.233372 C550.5,144.439371 550.493133,144.631637 550.4794,144.837636",
      //  "LOGISTICS": "M514.69566,165.168333 C512.506393,165.168333 510.724592,163.396733 510.724592,161.213133 C510.724592,159.0364 512.506393,157.2648 514.69566,157.2648 C516.884928,157.2648 518.666729,159.0364 518.666729,161.213133 C518.666729,163.396733 516.884928,165.168333 514.69566,165.168333 L514.69566,165.168333 Z M507.678955,157.821 L486.75315,157.821 C486.366402,157.821 486.048717,157.512 486.048717,157.1206 C486.048717,156.736067 486.366402,156.4202 486.75315,156.4202 L507.678955,156.4202 C508.065702,156.4202 508.383388,156.736067 508.383388,157.1206 C508.383388,157.512 508.065702,157.821 507.678955,157.821 L507.678955,157.821 Z M507.678955,161.7968 L486.75315,161.7968 C486.366402,161.7968 486.048717,161.4878 486.048717,161.0964 C486.048717,160.711867 486.366402,160.396 486.75315,160.396 L507.678955,160.396 C508.065702,160.396 508.383388,160.711867 508.383388,161.0964 C508.383388,161.4878 508.065702,161.7968 507.678955,161.7968 L507.678955,161.7968 Z M507.678955,165.7726 L486.75315,165.7726 C486.366402,165.7726 486.048717,165.456733 486.048717,165.0722 C486.048717,164.6808 486.366402,164.3718 486.75315,164.3718 L507.678955,164.3718 C508.065702,164.3718 508.383388,164.6808 508.383388,165.0722 C508.383388,165.456733 508.065702,165.7726 507.678955,165.7726 L507.678955,165.7726 Z M482.125992,147.527867 C480.758563,147.527867 479.625945,146.415467 479.625945,145.035267 L479.625945,139.418333 C479.625945,138.031267 480.620439,136.815867 482.125992,136.1292 C482.125992,136.1292 488.224172,134.0486 497.222958,134.0486 C506.207933,134.0486 512.340644,136.1292 512.340644,136.1292 C514.308913,137.104267 514.833784,138.779733 514.833784,140.159933 L514.833784,145.035267 C514.833784,146.415467 513.714979,147.527867 512.340644,147.527867 L482.125992,147.527867 Z M479.708819,165.168333 C477.50574,165.168333 475.723938,163.396733 475.723938,161.213133 C475.723938,159.0364 477.50574,157.2648 479.708819,157.2648 C481.898087,157.2648 483.686794,159.0364 483.686794,161.213133 C483.686794,163.396733 481.898087,165.168333 479.708819,165.168333 L479.708819,165.168333 Z M526.967989,169.8926 L526.042557,169.8926 L526.042557,167.509867 C526.042557,163.190733 525.780121,159.214933 525.241437,155.5962 C525.227625,155.541267 525.220719,155.486333 525.2,155.4314 L525.2,131.404933 L523.763509,131.404933 L523.763509,125.822333 L521.843584,125.822333 L521.843584,131.404933 L520.39328,131.404933 L520.39328,147.802533 C520.054876,147.5828 519.709566,147.3768 519.329725,147.1708 L519.329725,130.388667 C519.329725,129.015333 512.761923,124.771733 497.00196,124.771733 C481.235091,124.771733 474.84685,129.015333 474.84685,130.388667 L474.84685,147.301267 C471.794307,148.9836 469.915819,151.744 469.190667,155.5962 C468.651983,159.214933 468.396454,163.190733 468.396454,167.509867 L468.396454,169.8926 L467.464116,169.8926 C466.490341,169.8926 466,171.211 466,173.8478 C466,176.409067 466.490341,177.693133 467.464116,177.693133 L473.583014,177.693133 L473.583014,178.881067 C473.583014,180.652667 473.652077,182.101533 473.783294,183.2414 C473.914512,184.388133 474.073355,185.315133 474.259823,186.0224 C475.04713,187.3408 476.518152,188 478.638357,188 C480.668782,188 482.098367,187.3408 482.899487,186.0224 C483.424358,184.958067 483.700607,182.836267 483.700607,179.684467 L483.700607,177.693133 L510.738404,177.693133 L510.738404,179.684467 C510.738404,182.836267 511.007746,184.958067 511.539524,186.0224 C512.333738,187.3408 513.756416,188 515.793747,188 C517.920859,188 519.391881,187.3408 520.186094,186.0224 C520.351843,185.315133 520.524498,184.388133 520.64881,183.2414 C520.780028,182.101533 520.84909,180.652667 520.84909,178.881067 L520.84909,177.693133 L526.967989,177.693133 C527.941764,177.693133 528.432105,176.409067 528.432105,173.8478 C528.432105,171.211 527.941764,169.8926 526.967989,169.8926 L526.967989,169.8926 Z M540,96.9617333 C540,96.3986667 539.495847,95.9660667 538.487541,95.6982667 L536.339711,94.9360667 C533.90182,94.0090667 532.396267,93.5627333 531.829958,93.5627333 C531.75399,93.5627333 531.325805,93.6588667 530.531591,93.8854667 C529.737378,94.0914667 528.535698,94.476 526.878208,95.0596667 C526.740084,95.1146 525.80084,95.3137333 524.074288,95.6364667 C522.361549,95.9523333 519.771722,96.4673333 516.332431,97.1952 L482.250303,85.103 C482.181241,85.0343333 481.939524,85 481.497527,85 C480.288941,85 479.239197,85.5699333 478.369015,86.7098 L500.102846,99.9556 L492.789174,101.3564 L486.449277,96.3437333 L484.722725,96.6596 L484.722725,100.6148 L477.409053,97.8338 L476.007093,98.6921333 L482.464396,104.350267 L482.464396,104.666133 C482.464396,105.6618 483.141204,106.169933 484.501727,106.169933 L487.747643,110.118267 L489.349883,109.5964 L489.888567,106.7124 L506.870929,106.7124 L510.434531,109.383533 L510.434531,117.9394 L513.652823,117.9394 L520.220625,103.814667 C522.423705,103.471333 524.764909,103.011267 527.2028,102.4894 C529.647597,101.940067 532.251237,101.390733 535.04825,100.827667 C535.552403,100.6148 536.084181,100.347 536.664302,100.024267 C537.244424,99.7015333 537.783108,99.3650667 538.287261,99.008 C538.777601,98.6578 539.185068,98.3007333 539.509659,97.9368 C539.841157,97.5797333 540,97.257 540,96.9617333 L540,96.9617333 Z",
      //  "EMERGENCY TELECOMMUNICATIONS": "M515.0872,114.0084 C515.074,107.877 510.1174,102.927 503.986,102.9072 C497.8744,102.927 492.898,107.877 492.8848,114.0084 C492.8848,114.972 492.106,115.7574 491.1424,115.7574 C490.1854,115.7574 489.4,114.972 489.4,114.0084 C489.4,105.9432 495.9406,99.4356 503.986,99.4224 C512.038,99.4356 518.5522,105.9432 518.572,114.0084 C518.572,114.972 517.7998,115.7574 516.8362,115.7574 C515.866,115.7574 515.0872,114.972 515.0872,114.0084 L515.0872,114.0084 Z M522.9676,114.0084 C522.9346,103.5144 514.48,95.0532 503.986,95.04 C493.5052,95.0532 485.0176,103.5144 484.9978,114.0084 C484.9978,114.972 484.2322,115.7574 483.2686,115.7574 C482.305,115.7574 481.5262,114.972 481.5262,114.0084 C481.5262,101.6136 491.578,91.5684 503.986,91.5288 C516.4006,91.5684 526.4524,101.6136 526.4524,114.0084 C526.4524,114.972 525.6736,115.7574 524.71,115.7574 C523.753,115.7574 522.9676,114.972 522.9676,114.0084 L522.9676,114.0084 Z M532.0096,114.0084 C531.9766,98.5314 519.4696,86.0244 503.986,85.9914 C488.5222,86.0244 476.002,98.5314 475.9624,114.0084 C475.9624,114.972 475.1968,115.7574 474.2266,115.7574 C473.2696,115.7574 472.4974,114.972 472.4974,114.0084 C472.4974,96.6174 486.6016,82.5 503.986,82.5 C521.3902,82.5 535.501,96.6174 535.501,114.0084 C535.501,114.972 534.7156,115.7574 533.752,115.7574 C532.795,115.7574 532.0096,114.972 532.0096,114.0084 L532.0096,114.0084 Z M502.996,153.5952 C502.996,155.166 501.7156,156.453 500.1448,156.453 L485.7832,156.453 C484.1992,156.453 482.9254,155.166 482.9254,153.5952 L482.9254,136.6992 C482.9254,135.1152 484.1992,133.8414 485.7832,133.8414 L500.1448,133.8414 C501.7156,133.8414 502.996,135.1152 502.996,136.6992 L502.996,153.5952 Z M505.1608,128.0004 L505.1608,117.7506 C505.966,117.1962 506.494,116.2722 506.494,115.2228 C506.494,113.5266 505.1014,112.134 503.4052,112.134 C501.7024,112.134 500.323,113.5266 500.323,115.2228 C500.323,116.2656 500.8444,117.1896 501.6298,117.744 L501.6298,127.9146 L481.876,127.9146 C480.3052,127.9146 479.0182,129.195 479.0182,130.7658 L479.0182,178.6488 C479.0182,180.2262 480.3052,181.5 481.876,181.5 L504.5074,181.5 C506.0848,181.5 507.3652,180.2262 507.3652,178.6488 L507.3652,130.7658 C507.3652,129.4194 506.4214,128.2974 505.1608,128.0004 L505.1608,128.0004 Z",
      //  "HEALTH": "M502.375839,153.967152 C501.266652,154.671777 500.186964,155.33564 499.124976,155.999502 L499.290174,144.055803 C505.030809,146.321088 504.606014,149.314292 504.700413,150.59543 C504.853811,151.538813 504.06322,152.936418 502.375839,153.967152 M488.723394,150.59543 C488.811893,149.279352 488.351698,146.146387 494.646927,143.863633 L494.794425,156.30814 C493.579039,155.551104 492.322353,154.770774 491.042067,153.967152 C489.354686,152.936418 488.564095,151.538813 488.723394,150.59543 M513.892509,100.543702 C511.101841,98.2842411 509.154863,98.8141663 506.358294,103.740724 C504.505715,107.001802 501.561648,107.391967 499.762169,107.29297 L499.773969,106.646577 C501.862545,105.615844 503.337528,103.536906 503.337528,101.079451 C503.337528,97.6203787 500.49966,94.8251688 497.001,94.8251688 C493.50234,94.8251688 490.652672,97.6203787 490.652672,101.079451 C490.652672,103.536906 492.127655,105.615844 494.222131,106.640754 L494.228031,107.29297 C492.428552,107.391967 489.478585,107.001802 487.631906,103.740724 C484.841237,98.8141663 482.894259,98.2842411 480.109491,100.543702 C477.301123,102.808987 466.238748,115.859123 452.7515,114.659512 C452.7515,114.659512 455.42417,120.651744 462.710587,119.324019 C462.710587,119.324019 466.604543,123.313016 472.929272,120.517806 C472.929272,120.517806 476.209635,123.44113 481.436976,120.785681 C481.436976,120.785681 485.319132,123.714828 489.466785,121.181669 C489.466785,121.181669 491.803159,122.852971 494.399129,122.422043 L494.570227,137.48706 C494.275231,137.428826 494.039233,137.358946 493.726537,137.306536 C493.714737,137.300713 489.201288,136.345683 484.422342,135.023781 C479.826294,133.835817 474.775951,131.908287 474.03256,130.90667 C474.097459,130.842613 474.203658,130.796026 474.333456,130.731969 C474.740552,130.516505 475.442644,130.301041 476.268634,130.132164 C477.956015,129.794409 480.245189,129.619709 482.546163,129.526535 C487.112712,129.363481 487.938702,129.561475 488.015402,129.578945 C488.021301,129.433361 490.664472,129.88176 491.390163,127.232134 C491.360664,127.20884 491.437363,127.098196 491.396063,127.03414 C491.242665,125.21143 489.820781,125.118256 488.658494,124.908615 C486.764616,124.664035 487.749905,124.757208 485.207033,124.792148 C481.023981,125.094963 468.132626,124.070052 466.510145,130.766909 C466.510145,130.953257 466.498345,131.069724 466.474745,131.238601 C467.017539,137.067778 479.248101,139.600937 488.1098,141.34212 C485.100834,143.374471 483.496053,146.018273 482.85296,149.436582 C482.552063,153.087825 485.48433,156.552721 492.292853,160.431075 C487.118612,164.041554 483.72025,167.442393 483.997547,171.542034 C484.481341,174.884639 487.472608,179.351152 493.348941,182.169655 C493.366641,182.181302 493.372541,182.163832 493.384341,182.169655 L493.402041,182.169655 C493.402041,182.169655 489.283887,175.973606 489.00659,172.584414 C488.735193,170.610297 489.87978,167.68115 494.877024,164.163844 L495.024522,176.550118 L495.048122,176.550118 C495.083522,177.604145 495.903612,178.448532 496.942001,178.448532 C497.980389,178.448532 498.80638,177.604145 498.835879,176.550118 L498.853579,176.550118 L499.024677,164.495776 C503.632525,167.861674 504.676813,170.668531 504.411316,172.584414 C504.134019,175.973606 500.027666,182.169655 500.027666,182.169655 L500.039466,182.169655 C500.039466,182.169655 500.045366,182.181302 500.074865,182.169655 C505.945299,179.351152 508.942465,174.884639 509.42036,171.542034 C509.697657,167.442393 506.299295,164.041554 501.130953,160.431075 C507.933576,156.552721 510.871743,153.087825 510.570847,149.436582 C509.927754,146.018273 508.322972,143.374471 505.308106,141.34212 C514.175706,139.600937 526.400368,137.067778 526.943162,131.238601 C526.919562,131.069724 526.907762,130.953257 526.907762,130.766909 C525.29118,124.070052 512.393926,125.094963 508.210873,124.792148 C505.668002,124.757208 506.653291,124.664035 504.759412,124.908615 C503.597125,125.118256 502.175242,125.21143 502.021843,127.03414 C501.980544,127.098196 502.063143,127.20884 502.033643,127.232134 C502.759335,129.88176 505.402505,129.433361 505.408405,129.578945 C505.479204,129.561475 506.305195,129.363481 510.877643,129.526535 C513.172717,129.619709 515.461891,129.794409 517.149272,130.132164 C517.987063,130.301041 518.671455,130.516505 519.08445,130.731969 C519.214249,130.796026 519.326348,130.842613 519.391247,130.90667 C518.647855,131.908287 513.597512,133.835817 509.001464,135.023781 C504.222518,136.345683 499.703169,137.300713 499.69137,137.306536 C499.573371,137.329829 499.484872,137.353123 499.366873,137.370593 L499.561571,122.422043 C502.181141,122.870441 504.535215,121.181669 504.535215,121.181669 C508.665168,123.714828 512.565024,120.785681 512.565024,120.785681 C517.786465,123.44113 521.066828,120.517806 521.066828,120.517806 C527.385657,123.313016 531.279613,119.324019 531.279613,119.324019 C538.57193,120.651744 541.2505,114.659512 541.2505,114.659512 C527.757352,115.859123 516.694977,102.808987 513.892509,100.543702",
      //  "SHELTER/NFI": "M471.145813,133.725918 L497.0065,116.797124 L522.867186,133.725918 L471.145813,133.725918 Z M538.2505,135.359399 L497.0065,108.365726 L455.7515,135.359399 L459.617953,141.266327 L465.293884,137.559372 L465.293884,182.174831 L528.724615,182.174831 L528.724615,137.559372 L534.384047,141.266327 L538.2505,135.359399 Z",
      //  "PROTECTION": "M496.996067,147.400992 C501.445933,147.400992 505.215,145.796349 508.377267,142.661124 C511.524733,139.511088 513.098467,135.734006 513.098467,131.265693 C513.098467,126.827005 511.524733,123.020299 508.377267,119.870262 C505.215,116.715288 501.445933,115.174831 496.996067,115.174831 C492.556067,115.174831 488.7426,116.715288 485.629667,119.870262 C482.457533,123.020299 480.903533,126.827005 480.903533,131.265693 C480.903533,135.734006 482.457533,139.511088 485.629667,142.661124 C488.7426,145.796349 492.556067,147.400992 496.996067,147.400992 M521.766333,140.903424 L504.751267,158.361935 L504.751267,182.095833 L504.8894,182.095833 L504.8894,182.174831 L518.840867,182.174831 L518.840867,171.929805 L533.063667,153.118457 C533.631,152.417351 534.001,151.553313 534.001,150.60534 L534.001,121.702024 C534.001,119.440712 532.1658,117.599076 529.896467,117.599076 C527.641933,117.599076 525.8018,119.440712 525.8018,121.702024 L525.8018,138.395244 C526.798333,138.612488 527.735667,139.027226 528.4954,139.76783 C530.671,141.895833 530.725267,145.391486 528.603933,147.573799 L520.838867,155.557514 L519.7782,154.525605 L527.553133,146.56164 C529.107133,144.95206 529.0726,142.379695 527.479133,140.814551 C526.9858,140.345502 526.383933,140.009761 525.7574,139.832016 C525.0914,139.639459 524.390867,139.629584 523.719933,139.76783 C522.970067,139.95545 522.2942,140.345502 521.766333,140.903424 M472.2406,140.903424 L489.2458,158.361935 L489.2458,182.095833 L489.107667,182.095833 L489.107667,182.174831 L475.166067,182.174831 L475.166067,171.929805 L460.938333,153.118457 C460.371,152.417351 460.001,151.553313 460.001,150.60534 L460.001,121.702024 C460.001,119.440712 461.8362,117.599076 464.105533,117.599076 C466.360067,117.599076 468.2002,119.440712 468.2002,121.702024 L468.2002,138.395244 C467.2086,138.612488 466.266333,139.027226 465.5066,139.76783 C463.335933,141.895833 463.281667,145.391486 465.403,147.573799 L473.163133,155.557514 L474.218867,154.525605 L466.448867,146.56164 C464.894867,144.95206 464.9294,142.379695 466.517933,140.814551 C467.021133,140.345502 467.6082,140.009761 468.239667,139.832016 C468.915533,139.639459 469.611133,139.629584 470.282067,139.76783 C471.036867,139.95545 471.712733,140.345502 472.2406,140.903424",
      //  "WASH": "M534.093581,153.551892 L534.093581,144.336087 C534.093581,138.497856 528.794104,133.452216 521.764398,133.452216 L505.347935,133.452216 L505.25987,128.32887 C505.25987,126.857657 504.058033,125.655821 502.58164,125.655821 L496.163212,125.655821 L496.163212,122.366312 C496.717507,122.039951 497.178556,121.625525 497.567081,121.123033 L511.237969,121.123033 C512.154888,122.293787 513.501773,123.112279 515.102495,123.112279 C517.822167,123.112279 520.039348,120.900279 520.039348,118.170245 C520.039348,115.440212 517.822167,113.228211 515.102495,113.228211 C513.470691,113.228211 512.082363,114.088146 511.186166,115.321064 L497.634425,115.321064 C496.722687,114.088146 495.3499,113.228211 493.707736,113.228211 C492.081113,113.228211 490.687604,114.088146 489.791407,115.321064 L474.830617,115.321064 C473.93442,114.088146 472.551272,113.228211 470.924649,113.228211 C468.189435,113.228211 465.982615,115.440212 465.982615,118.170245 C465.982615,120.900279 468.189435,123.112279 470.924649,123.112279 C472.50983,123.112279 473.867076,122.293787 474.763273,121.123033 L489.853571,121.123033 C490.247276,121.635885 490.718686,122.055492 491.283342,122.371492 L491.283342,125.655821 L484.471209,125.655821 C482.999996,125.655821 481.79816,126.857657 481.79816,128.32887 L481.79816,133.452216 L461.853893,133.452216 L461.853893,149.412809 L484.041242,149.412809 C486.21698,153.774647 489.112784,155.934844 493.469441,155.934844 C497.820917,155.934844 501.447147,153.774647 503.622886,149.412809 L511.605773,149.412809 C513.988724,149.412809 514.86938,150.946187 515.123216,153.883433 C514.423872,154.360024 513.942101,155.131893 513.942101,156.043631 C513.942101,157.525205 515.143937,158.721861 516.615151,158.721861 L533.176663,158.721861 C534.653056,158.721861 535.854893,157.525205 535.854893,156.043631 C535.854893,154.888417 535.119286,153.924876 534.093581,153.551892 M524.665382,161.653927 C526.115874,164.554911 532.648269,179.790259 532.648269,181.971177 C532.648269,193.917016 516.687675,193.917016 516.687675,181.971177 C516.687675,179.790259 523.21489,163.829665 524.665382,161.653927",
      //  "CAMP COORDINATION AND CAMP MANAGEMENT (CCCM)": "M550.717754,143.247246 C552.186241,141.146395 551.666298,138.244551 549.551395,136.776063 L506.599886,106.893391 C502.187396,103.829943 495.526504,103.829943 491.121041,106.893391 L448.155479,136.776063 C446.047602,138.244551 445.520633,141.146395 446.989121,143.247246 C448.457608,145.355123 451.352426,145.882092 453.46733,144.413604 L496.418839,114.530933 C497.627355,113.687782 500.086545,113.687782 501.288035,114.530933 L544.246571,144.413604 C545.05459,144.975705 545.982056,145.242703 546.89547,145.242703 C548.370984,145.242703 549.818393,144.547103 550.717754,143.247246 L550.717754,143.247246 Z M498.85695,179.804861 C498.85695,179.804861 500.198965,189.121678 500.198965,189.128704 C500.374622,189.585411 500.81025,189.915645 501.330193,189.915645 C501.864188,189.915645 502.313869,189.557306 502.475473,189.065468 C502.489525,189.044389 502.51763,188.496341 502.489525,188.397973 L501.941477,176.952201 L502.110107,173.024523 C502.264685,171.682508 502.29279,172.083005 503.810461,171.176617 C505.363264,170.242125 508.005137,166.152844 508.13161,165.949082 C508.258082,165.745321 508.504001,165.386982 508.553185,165.155115 C508.623448,164.747592 508.35645,164.354122 507.948927,164.269807 C507.639772,164.220623 507.3798,164.382227 507.176039,164.600041 C506.972277,164.817855 503.929908,168.864979 501.653401,169.251423 C501.14751,169.174134 500.592436,168.914163 499.145027,168.914163 L498.568874,168.914163 C497.121465,168.914163 496.56639,169.174134 496.053474,169.251423 C493.776966,168.864979 490.734597,164.817855 490.530836,164.600041 C490.3341,164.382227 490.074129,164.220623 489.764974,164.269807 C489.357451,164.354122 489.090453,164.747592 489.160715,165.155115 C489.209899,165.386982 489.455818,165.745321 489.575265,165.949082 C489.701737,166.152844 492.350636,170.242125 493.896413,171.176617 C495.421111,172.083005 495.449216,171.682508 495.603793,173.024523 L495.772423,176.952201 L495.231402,188.397973 C495.19627,188.496341 495.231402,189.044389 495.238428,189.065468 C495.400032,189.557306 495.842686,189.915645 496.383708,189.915645 C496.896625,189.915645 497.339279,189.585411 497.514935,189.128704 C497.514935,189.121678 498.85695,179.804861 498.85695,179.804861 L498.85695,179.804861 Z M498.85695,162.260297 C497.20578,162.260297 495.870791,163.595286 495.870791,165.23943 C495.870791,166.883574 497.20578,168.211537 498.85695,168.211537 C500.501094,168.211537 501.836083,166.883574 501.836083,165.23943 C501.836083,163.595286 500.501094,162.260297 498.85695,162.260297 L498.85695,162.260297 Z M523.50506,161.325805 L523.835294,150.765341 L529.765455,163.897415 C530.011374,164.473568 530.678869,164.747592 531.262048,164.501673 C531.838201,164.255754 532.119251,163.595286 531.866306,163.00508 C531.866306,163.00508 527.692709,149.936242 526.498246,147.498131 C525.310808,145.067046 523.469929,143.584506 518.937993,143.584506 L518.003501,143.584506 C513.478591,143.584506 511.630686,145.067046 510.443248,147.498131 C509.248784,149.936242 505.075188,163.00508 505.075188,163.00508 C504.829269,163.595286 505.096267,164.255754 505.679446,164.501673 C506.262625,164.747592 506.93012,164.473568 507.169012,163.897415 L513.1062,150.765341 L513.429407,161.325805 L512.501941,187.871004 C512.424653,188.924943 513.21862,189.83133 514.265532,189.908619 C514.314716,189.908619 514.3639,189.915645 514.399031,189.915645 C515.396759,189.915645 516.232884,189.142757 516.310173,188.138002 L518.467234,167.614305 L520.631321,188.138002 C520.701583,189.142757 521.537708,189.915645 522.535437,189.915645 C522.577594,189.915645 522.626778,189.908619 522.668935,189.908619 C523.722874,189.83133 524.509815,188.924943 524.439552,187.871004 L523.498034,161.325805 L523.50506,161.325805 Z M518.481286,132.742991 C515.79023,132.742991 513.61209,134.914105 513.61209,137.598135 C513.61209,140.282165 515.79023,142.453278 518.481286,142.453278 C521.151264,142.453278 523.322377,140.282165 523.322377,137.598135 C523.322377,134.914105 521.151264,132.742991 518.481286,132.742991 L518.481286,132.742991 Z M479.759584,170.860436 L480.79947,188.770365 C480.79947,189.402728 481.319413,189.915645 481.937723,189.915645 C482.570086,189.915645 483.083003,189.402728 483.083003,188.770365 L484.052627,170.860436 L487.221469,170.860436 L483.947233,150.779393 L490.537862,163.904441 C490.783781,164.487621 491.451275,164.768671 492.034455,164.515726 C492.610608,164.269807 492.891658,163.602312 492.638713,163.019133 C492.638713,163.019133 487.804648,149.950295 486.610184,147.512184 C485.422747,145.081099 484.242336,143.598558 479.7104,143.598558 L478.775908,143.598558 C474.258024,143.598558 473.070587,145.081099 471.876123,147.512184 C470.688686,149.950295 465.847595,163.019133 465.847595,163.019133 C465.608702,163.602312 465.8757,164.269807 466.451853,164.515726 C467.035032,164.768671 467.702526,164.487621 467.948445,163.904441 L474.546101,150.779393 L471.257812,170.860436 L474.426654,170.860436 L475.41033,188.770365 C475.41033,189.402728 475.923247,189.915645 476.548584,189.915645 C477.187973,189.915645 477.693864,189.402728 477.693864,188.770365 L478.670514,170.860436 L479.759584,170.860436 Z M484.10181,137.612187 C484.10181,140.289191 481.930697,142.467331 479.246667,142.467331 C476.562637,142.467331 474.384497,140.289191 474.384497,137.612187 C474.384497,134.928157 476.562637,132.757044 479.246667,132.757044 C481.930697,132.757044 484.10181,134.928157 484.10181,137.612187 L484.10181,137.612187 Z",
      //  "EDUCATION": "M540.015749,184.572879 C519.672049,171.747519 502.068795,183.500545 502.068795,185.511171 L502.068795,142.764034 C502.068795,135.166303 512.149499,131.065844 524.587836,131.065844 C530.566988,131.065844 535.987113,132.485468 540.015749,134.806828 L540.015749,184.572879 Z M495.937733,185.511171 C495.937733,183.500545 478.322326,171.747519 457.978626,184.572879 L457.978626,134.806828 C462.007262,132.485468 467.427387,131.065844 473.406539,131.065844 C485.857029,131.065844 495.937733,135.166303 495.937733,142.764034 L495.937733,185.511171 Z M499.304044,133.295811 C496.150406,130.273779 478.048889,119.775872 453.281589,130.474841 L453.281589,138.121315 L453.281589,189.160763 L490.803197,189.160763 C492.091389,190.275747 495.153881,191.055626 498.738942,191.055626 C502.317926,191.055626 505.386495,190.275747 506.680762,189.160763 L544.427196,189.160763 L544.427196,138.121315 L544.427196,130.474841 C520.674651,119.976934 501.698136,131.084122 499.304044,133.295811 L499.304044,133.295811 Z",
      //  "SOCIAL COHESION AND SUSTAINABLE LIVELIHOODS": "M522.287557,136.708182 C528.076142,139.655825 528.26287,124.210708 528.26287,124.210708 C526.929095,125.004304 516.498973,133.760538 522.287557,136.708182 M521.734041,144.090628 C527.189181,146.878218 534.43825,136.12799 534.444919,134.487446 C534.444919,134.487446 532.977766,138.428752 526.548969,138.101977 C519.299901,137.761864 519.293232,142.836879 521.734041,144.090628 M517.719377,151.946564 C523.174518,154.734154 530.436924,143.983926 530.450262,142.336713 C530.450262,142.336713 528.963102,146.278019 522.534306,145.964582 C515.291906,145.624469 515.278568,150.706153 517.719377,151.946564 M513.591343,160.049248 C519.053152,162.83017 526.302221,152.08661 526.315559,150.439398 C526.315559,150.439398 524.835068,154.360697 518.399602,154.067266 C511.163872,153.713816 511.157203,158.802169 513.591343,160.049248 M517.899437,133.700519 C513.858098,128.678855 516.185536,125.171026 516.185536,125.171026 C514.865098,126.144682 510.416958,138.308712 515.86543,141.102971 C518.306238,142.343382 522.414266,139.355726 517.899437,133.700519 M513.884773,141.556455 C509.856772,136.528122 512.18421,133.020293 512.18421,133.020293 C510.850435,134.000618 506.402294,146.171317 511.864104,148.958907 C514.304913,150.205987 518.41294,147.218331 513.884773,141.556455 M509.756739,149.65247 C505.728738,144.624138 508.042838,141.122978 508.042838,141.122978 C506.715731,142.096634 502.280929,154.274002 507.722732,157.054923 C510.176878,158.302003 514.284906,155.307677 509.756739,149.65247 M507.562679,167.678443 L511.744064,160.976222 C512.084177,160.309335 510.923792,160.462719 509.87011,159.92254 C508.809759,159.382361 508.256242,158.368692 507.929467,159.022241 L504.975155,166.578078 C504.615035,167.291648 506.78242,169.212284 507.562679,167.678443 M531.083805,152.26667 C530.443593,153.293677 529.743361,154.233988 529.056467,155.1743 C532.71768,156.71481 535.011773,158.662122 535.011773,160.802831 C535.011773,165.751138 523.274551,169.765801 508.809759,169.765801 C494.338297,169.765801 482.601075,165.751138 482.601075,160.802831 C482.601075,156.561426 491.243939,153.020253 502.814439,152.093279 C502.821108,151.092948 502.834445,150.099285 502.941147,149.038934 C488.182924,149.725828 476.939199,153.500412 476.939199,165.137601 C476.939199,178.195261 491.077217,192.5 508.509659,192.5 C525.935433,192.5 540.066781,178.195261 540.066781,165.137601 C540.066781,158.715473 536.625641,154.70081 531.083805,152.26667 M485.048553,134.707519 L485.048553,140.842885 C484.428347,140.596137 483.854824,140.175997 483.347989,139.615812 C482.834486,139.048957 482.494373,138.375401 482.307645,137.595142 L477.772809,138.001944 C478.11959,139.92258 478.913187,141.416408 480.166935,142.470091 C481.414015,143.523773 483.041221,144.157316 485.048553,144.357383 L485.048553,147.024933 L487.569388,147.024933 L487.569388,144.290694 C489.823468,144.010601 491.584051,143.270356 492.857807,142.063289 C494.124893,140.849554 494.758436,139.355726 494.758436,137.595142 C494.758436,136.014619 494.258271,134.714188 493.244601,133.700519 C492.24427,132.686849 490.350309,131.866578 487.569388,131.233034 L487.569388,125.50447 C488.696428,125.911271 489.383322,126.704867 489.650077,127.851914 L494.051536,127.365086 C493.751436,125.904602 493.051204,124.73088 491.964177,123.857257 C490.87715,122.983635 489.403329,122.456793 487.569388,122.270065 L487.569388,120.81625 L485.048553,120.81625 L485.048553,122.270065 C483.054559,122.430118 481.460697,123.063661 480.2603,124.150688 C479.059902,125.237715 478.466372,126.584828 478.466372,128.185358 C478.466372,129.772551 478.993213,131.112995 480.053564,132.226697 C481.113916,133.33373 482.774466,134.160671 485.048553,134.707519 M476.572411,154.447392 L468.616442,154.447392 C460.480413,154.447392 458.719829,147.665145 458.719829,147.665145 C453.384728,124.170695 469.590098,111.419803 469.590098,111.419803 L503.307936,111.419803 C503.307936,111.419803 509.703388,116.461474 513.13119,126.03798 C510.883779,128.652179 508.809759,131.719862 507.075851,135.23436 C505.448645,138.548792 504.301598,141.88323 503.58136,145.077621 C495.358635,145.351045 482.681102,146.818198 476.572411,154.447392 M498.526351,92.5535525 C491.997522,91.8333138 489.710097,95.8413084 486.455686,96.0013615 C483.16793,95.8413084 480.907181,91.8333138 474.365013,92.5535525 C467.696137,93.3004666 463.64146,98.9756802 463.64146,98.9756802 L471.784158,106.544855 L501.107207,106.544855 L509.249904,98.9756802 C509.249904,98.9756802 505.195228,93.3004666 498.526351,92.5535525 M482.801141,128.678855 C482.801141,129.192358 482.994539,129.679186 483.361327,130.119332 C483.741453,130.572816 484.301639,130.919597 485.048553,131.19969 L485.048553,126.131344 C484.361658,126.318073 483.814811,126.658185 483.414678,127.118338 C483.007877,127.598497 482.801141,128.105331 482.801141,128.678855 M489.816799,137.094977 C490.276952,137.568467 490.497024,138.128652 490.497024,138.788871 C490.497024,139.50911 490.230269,140.155991 489.683422,140.69617 C489.143243,141.236349 488.443011,141.576461 487.569388,141.709839 L487.569388,136.001281 C488.603064,136.254698 489.356647,136.621486 489.816799,137.094977",
      //  "COORDINATION AND SUPPORT SERVICES": "M492,133.229333 C486.602667,133.229333 482.229333,137.602667 482.229333,143 C482.229333,148.408 486.602667,152.781333 492,152.781333 C497.397333,152.781333 501.776,148.408 501.776,143 C501.776,137.602667 497.397333,133.229333 492,133.229333 L492,133.229333 Z M459.445333,132.893333 L481.888,132.893333 L481.898667,110.44 L475.178667,117.165333 L461.013333,103 L452,112.018667 L466.16,126.168 L459.445333,132.893333 Z M532,112.008 L522.997333,103 L508.832,117.165333 L502.112,110.450667 L502.112,132.888 L524.565333,132.893333 L517.84,126.168 L532,112.008 Z M522.997333,183 L532,173.992 L517.845333,159.832 L524.56,153.117333 L502.117333,153.117333 L502.112,175.565333 L508.832,168.845333 L522.997333,183 Z M466.16,159.832 L459.44,153.117333 L481.893333,153.117333 L481.893333,175.565333 L475.173333,168.845333 L461.013333,183 L452,173.992 L466.16,159.832 Z"
      //};

      var icons = {
        "food": "M519.606974,145.867632 C520.623238,140.230119 520.547705,134.935937 520.547705,130.850285 L520.348572,121.195785 C520.341705,121.188919 520.259306,124.883172 520.176906,130.829685 C520.06704,134.963404 519.998373,140.298785 518.892844,145.936299 C517.718648,146.828962 515.912721,148.319024 514.882724,151.752345 C514.855258,151.869078 514.841524,151.972078 514.814058,152.081944 C516.372786,151.937745 517.883447,151.759212 519.366642,151.553213 C519.847307,149.026288 519.634441,147.165428 519.606974,145.867632 M480.556377,143.718373 C475.138596,140.243852 471.602275,138.485992 471.609142,138.479125 C471.602275,138.485992 475.02873,140.415518 480.322912,144.054839 C483.399167,146.169765 487.141488,148.964488 491.453739,151.827878 C491.989337,151.889678 492.531802,151.930878 493.0674,151.985811 C488.212684,148.930155 484.003432,145.929432 480.556377,143.718373 M511.950668,152.054478 C511.284603,151.003881 510.584206,150.234817 509.883808,149.651153 C509.650343,149.005688 509.403143,148.40829 509.155944,147.872692 C510.666606,149.417687 512.081134,150.186751 512.602999,150.612483 L512.602999,150.358417 C512.795265,150.962681 512.960064,151.587546 513.145464,152.21241 C513.426996,152.184944 513.715395,152.17121 513.990061,152.150611 C513.475063,150.365283 512.898265,148.634889 512.266533,146.993762 C512.046801,146.114832 511.682869,145.146635 511.099204,144.116639 C510.543006,142.818843 509.986808,141.582847 509.437477,140.401785 C510.110408,140.86185 510.659739,141.170849 510.934405,141.390581 C510.845138,140.449851 511.071738,137.737528 508.860679,134.640672 C507.56975,132.827878 506.175821,132.017614 505.035959,131.578149 L501.533971,124.766439 C501.527104,124.766439 502.666967,127.252164 504.64456,131.43395 C504.349294,131.344683 504.074629,131.262283 503.834296,131.193617 C501.142572,127.252164 499.013913,123.502977 497.207986,120.687654 C494.626128,116.670668 492.779001,114.390942 492.792735,114.384076 C492.785868,114.397809 494.495662,116.759934 496.947054,120.85932 C498.622514,123.68151 500.627574,127.416964 503.230032,131.358416 C503.696963,132.580679 504.150162,134.462139 505.928622,136.968464 C506.759486,138.142659 507.645283,139.00099 508.44868,139.653321 C508.750812,140.346852 509.073545,141.060983 509.382543,141.80258 C507.878749,140.285052 506.361221,139.79752 505.331224,139.495388 C505.035959,139.035323 504.754426,138.582125 504.472894,138.128926 C502.735633,134.407206 500.874773,131.118084 499.316045,128.378294 C495.875857,122.369981 493.644198,118.689461 493.657932,118.689461 L498.91778,128.543093 C499.316045,129.28469 499.728044,130.088088 500.167509,130.905218 C499.590711,129.916421 499.04138,128.989425 498.526381,128.137961 C495.848391,123.798243 493.905131,121.346851 493.918864,121.333118 C493.905131,121.346851 495.704191,123.894376 498.237982,128.316494 C499.721177,130.925818 501.444704,134.25614 503.587097,137.840527 C504.527827,139.934853 505.427357,142.159645 506.217021,144.501171 C506.004155,144.988702 505.756956,145.579233 505.54409,146.286498 C503.175098,142.228312 501.252438,138.479125 499.528911,135.588268 C498.972713,134.626938 498.457715,133.789208 497.97705,133.006411 C495.807191,128.54996 493.328333,124.718373 491.33014,121.63525 C487.841885,116.251802 485.589626,112.928347 485.596493,112.928347 L490.979941,121.813783 C493.287133,125.631636 496.308456,130.527553 498.636248,136.240599 C498.093783,137.716928 497.297252,140.106519 498.471448,143.78704 C499.885977,148.277824 502.591434,150.296617 503.415431,151.182414 C503.490964,150.173017 504.335561,147.460694 503.339898,143.615374 C503.957896,144.775836 504.610227,145.970632 505.317491,147.192895 C505.022225,148.579956 504.953559,150.317217 505.489157,152.535143 C507.720816,152.514543 509.918142,152.43901 512.074267,152.29481 C512.026201,152.21241 511.998734,152.136877 511.950668,152.054478 M476.395192,145.785233 C476.388325,145.798966 479.237982,147.412627 483.694433,150.557549 C484.003432,150.626216 484.319298,150.694882 484.64203,150.756682 C479.649981,147.440094 476.388325,145.792099 476.395192,145.785233 M501.389771,123.097845 C501.84297,124.237708 502.296168,125.974969 504.012829,128.261561 C505.928622,130.843418 508.112215,131.777282 508.778279,132.257947 C508.668413,131.39275 508.798879,128.886425 506.683953,126.057368 C504.939826,123.736443 503.092699,123.221445 501.932236,122.939912 C499.350378,119.307458 497.317852,115.860404 495.594325,113.264813 C493.1292,109.549959 491.385073,107.4419 491.39194,107.435033 C491.385073,107.4419 493.005601,109.632359 495.353992,113.422746 C496.960787,116.025203 498.87658,119.472258 501.389771,123.097845 M504.012829,103.919312 C503.463497,104.757043 502.632634,106.130371 502.769967,108.574896 C502.975966,111.561886 504.308095,113.175547 504.672027,113.827878 C504.871159,113.182413 505.914889,111.431419 505.722623,108.636696 C505.592157,106.144104 504.823093,104.715843 504.452294,103.69958 C503.868629,99.8817263 502.749367,96.5102047 501.932236,93.8871472 L499.927176,87.7071687 C499.92031,87.7003021 500.565774,90.1104937 501.691904,93.9420803 C502.440368,96.6269376 503.484097,100.067126 504.012829,103.919312 M501.794903,119.575258 C503.614564,121.923649 505.653956,122.754513 506.278821,123.180245 C506.162088,122.390581 506.230754,120.083389 504.225695,117.494665 C502.584567,115.386606 500.854173,114.92654 499.782977,114.679341 C497.338452,111.362753 495.408926,108.190364 493.781531,105.800772 C491.453739,102.381184 489.826345,100.451658 489.826345,100.437924 C489.826345,100.451658 491.35074,102.463584 493.561799,105.951838 C495.086193,108.34143 496.898987,111.513819 499.274845,114.837274 C499.721177,115.874137 500.174376,117.474065 501.794903,119.575258 M498.389048,103.788846 C499.213046,105.780172 500.565774,106.50117 501.224972,107.112301 C501.362305,106.391304 502.275568,104.860042 501.341705,102.59405 C500.517708,100.705723 499.123779,99.9435261 498.423382,99.5589941 C495.024394,91.7859545 491.426273,86.1347076 490.602276,84.8025789 L490.423743,84.5004466 C490.36881,84.5210465 494.227863,90.968824 498.045716,100.005326 C497.908383,100.83619 497.709251,102.236985 498.389048,103.788846 M496.93332,106.556103 C497.352185,107.510566 497.777917,108.986895 499.316045,110.882088 C501.012106,113.038214 502.900433,113.766078 503.484097,114.15061 C503.353631,113.429612 503.374231,111.32842 501.506504,108.966295 C499.954643,107.050501 498.389048,106.631636 497.400252,106.411903 C495.120527,103.383714 493.328333,100.472258 491.783338,98.2955318 C489.627212,95.1506094 488.075351,93.3996156 488.095951,93.3858823 C488.075351,93.3996156 489.537946,95.2261425 491.577339,98.425998 C493.019334,100.616457 494.715395,103.527914 496.93332,106.556103 M513.873328,150.523216 C514.395193,149.754152 516.427719,147.900159 517.279183,144.130372 C518.02078,140.786317 517.546982,138.595858 517.416515,137.112663 C518.027647,131.811615 517.711781,126.901965 517.471449,123.104712 C517.114383,117.570198 516.812251,114.13001 516.812251,114.13001 L517.128116,123.097845 C517.251716,126.950032 517.450849,131.914615 516.757318,137.215663 C515.713588,138.128926 514.09306,139.618988 513.385796,142.894376 C512.506866,146.877029 513.639862,149.51382 513.873328,150.523216 M507.899349,111.980751 C507.226418,112.839081 506.196421,114.274209 506.168955,116.945333 C506.127755,120.200122 507.473617,122.067849 507.823816,122.816313 C508.084748,122.122782 509.34821,120.316855 509.38941,117.261199 C509.423743,114.535142 508.730212,112.921481 508.393747,111.788485 C508.057281,107.572366 507.123418,103.809446 506.402421,100.891123 L504.672027,93.9901468 L506.134621,100.932323 C506.766353,103.919312 507.624683,107.744032 507.899349,111.980751 M511.29147,120.234455 C510.501806,121.120252 509.279544,122.589714 509.046078,125.48057 C508.764546,128.989425 510.062341,131.111217 510.385073,131.948948 C510.735272,131.221084 512.239067,129.36709 512.520599,126.071102 C512.760932,123.125312 512.115467,121.312518 511.840802,120.062789 C511.785868,115.475872 511.023671,111.32842 510.446873,108.114831 L509.032345,100.513457 L510.165341,108.135431 C510.639139,111.410819 511.31207,115.626938 511.29147,120.234455 M514.209793,128.652959 C513.29653,129.552489 511.875135,131.042551 511.421936,134.13254 C510.852005,137.888594 512.094867,140.264452 512.3764,141.184582 C512.808998,140.442985 514.573725,138.568391 515.11619,135.025204 C515.589988,131.873415 515.020057,129.875222 514.814058,128.50876 C515.068124,123.55791 514.511926,119.032793 514.099927,115.523938 C513.481929,110.415156 513.035597,107.235901 513.042464,107.235901 L513.784061,115.530805 C514.099927,119.101459 514.546259,123.695243 514.209793,128.652959 M482.362304,120.85932 C482.073905,122.177715 481.682507,124.299508 483.117635,127.286497 C484.848029,130.953285 487.395554,132.347213 488.192084,132.999544 C488.130284,132.093147 488.562883,129.42889 486.942355,125.988702 C485.486627,122.939912 483.804299,121.484184 482.815503,120.392388 C480.123779,115.860404 476.99259,112.138684 474.589265,109.24096 L468.862485,102.429251 L474.314599,109.42636 C476.669858,112.433949 479.73238,116.265536 482.362304,120.85932 M466.946692,120.419855 C467.949221,121.271318 469.24015,122.69958 472.02114,124.031709 C475.117996,125.569837 477.672387,125.411904 478.537584,125.549237 C477.99512,124.807639 476.862124,122.459247 473.463135,120.770053 C470.654679,119.431058 468.635886,119.767524 467.393023,120.021589 C463.149438,117.824264 459.516984,115.475872 456.584928,113.841611 C452.416876,111.431419 449.697685,110.26409 449.704552,110.250357 C449.697685,110.26409 452.355076,111.561886 456.426995,114.102543 C459.249185,115.791737 462.764906,118.174462 466.946692,120.419855 M467.084024,116.588268 C469.109684,118.394195 471.032344,118.497195 472.117273,118.85426 C471.883808,117.97533 472.089807,115.791737 469.782615,113.745478 C467.818755,112.056284 465.827429,111.918951 464.811166,111.843418 C456.708527,104.901242 449.526019,100.437924 447.864291,99.3735947 L447.500359,99.1263956 C447.43856,99.1881954 455.355799,104.399977 464.625766,112.536949 C464.921032,113.539479 465.463497,115.201206 467.084024,116.588268 M474.1292,128.460693 C475.207263,129.394557 476.594325,130.960151 479.588181,132.457079 C482.939102,134.15314 485.706359,134.036407 486.647089,134.201207 C486.084025,133.377209 484.896096,130.761019 481.201842,128.900158 C478.180519,127.389497 475.976327,127.774029 474.623598,128.034961 C470.043547,125.58357 466.108961,123.029179 462.957172,121.195785 C458.445788,118.572728 455.520598,117.247466 455.534331,117.233732 C455.520598,117.254332 458.370255,118.716927 462.785506,121.470451 C465.827429,123.365644 469.624682,125.974969 474.1292,128.460693 M481.043909,136.618265 C482.183772,137.634528 483.653233,139.351189 486.853089,141.033516 C490.444343,142.928709 493.438199,142.860043 494.440729,143.052309 C493.850198,142.152779 492.627935,139.275655 488.672749,137.201929 C485.431694,135.505869 483.048969,135.876667 481.579507,136.151333 C476.683591,133.425276 472.474339,130.623686 469.102817,128.598026 C464.261834,125.714036 461.123779,124.258308 461.144378,124.244575 C461.130645,124.258308 464.179435,125.871969 468.903685,128.900158 C472.151607,130.987618 476.223526,133.851008 481.043909,136.618265 M490.725875,128.337094 C490.313877,129.731022 489.723345,131.997014 491.048607,135.334203 C492.641669,139.412988 495.285326,141.109049 496.102456,141.878113 C496.109323,140.889317 496.795987,138.053393 495.305926,134.221806 C493.973797,130.815952 492.25027,129.119891 491.261473,127.870162 C488.679616,122.768246 485.548427,118.531528 483.131368,115.235539 L477.377122,107.469366 L482.822369,115.407205 C485.163895,118.826794 488.219551,123.180245 490.725875,128.337094 M487.656486,144.885703 C488.865015,146.018699 490.396276,147.886425 493.788398,149.774752 C497.592518,151.896545 500.806107,151.896545 501.891036,152.143744 C501.279905,151.148081 500.050776,148.003158 495.848391,145.675366 C492.401336,143.773306 489.826345,144.144105 488.240151,144.405038 C483.042102,141.376848 478.585651,138.286859 474.98753,136.068933 C469.851281,132.903411 466.514093,131.28975 466.527826,131.28975 C466.514093,131.296617 469.762015,133.06821 474.788397,136.391666 C478.242319,138.678258 482.540837,141.816313 487.656486,144.885703 M473.531802,113.848478 C473.373869,115.07074 473.174736,117.027733 474.678531,119.69199 C476.546258,122.919313 478.928983,124.031709 479.71178,124.58104 C479.581314,123.750176 479.807913,121.264452 478.056919,118.243129 C476.546258,115.530805 474.898264,114.322276 473.923201,113.388412 C471.16281,109.412626 468.052221,106.226504 465.683229,103.713313 L460.038849,97.8492 C460.025116,97.8492 462.064509,100.197592 465.449763,103.905579 C467.763822,106.514903 470.833211,109.817758 473.531802,113.848478 M550.4794,144.837636 L550.493133,144.837636 C550.197868,152.43901 547.609143,160.685847 543.633357,168.280354 C543.633357,168.280354 534.143657,187.500087 504.349294,187.500087 C474.548065,187.500087 464.893565,168.45202 464.893565,168.45202 C460.910913,160.809447 458.493854,152.624409 458.191722,144.837636 L458.219189,144.837636 C458.198589,144.631637 458.191722,144.439371 458.191722,144.233372 C458.191722,140.580318 460.450848,137.16073 464.344234,134.201207 L468.498553,136.858597 C465.930428,138.582125 464.440367,140.504785 464.440367,142.551044 C464.440367,149.747286 482.307371,155.583932 504.349294,155.583932 C526.384351,155.583932 544.251355,149.747286 544.251355,142.551044 C544.251355,137.572728 535.681785,133.246743 523.102096,131.049418 L523.157029,125.823902 C539.259306,128.975691 550.5,136.020867 550.5,144.233372 C550.5,144.439371 550.493133,144.631637 550.4794,144.837636",
        "logistics": "M514.69566,165.168333 C512.506393,165.168333 510.724592,163.396733 510.724592,161.213133 C510.724592,159.0364 512.506393,157.2648 514.69566,157.2648 C516.884928,157.2648 518.666729,159.0364 518.666729,161.213133 C518.666729,163.396733 516.884928,165.168333 514.69566,165.168333 L514.69566,165.168333 Z M507.678955,157.821 L486.75315,157.821 C486.366402,157.821 486.048717,157.512 486.048717,157.1206 C486.048717,156.736067 486.366402,156.4202 486.75315,156.4202 L507.678955,156.4202 C508.065702,156.4202 508.383388,156.736067 508.383388,157.1206 C508.383388,157.512 508.065702,157.821 507.678955,157.821 L507.678955,157.821 Z M507.678955,161.7968 L486.75315,161.7968 C486.366402,161.7968 486.048717,161.4878 486.048717,161.0964 C486.048717,160.711867 486.366402,160.396 486.75315,160.396 L507.678955,160.396 C508.065702,160.396 508.383388,160.711867 508.383388,161.0964 C508.383388,161.4878 508.065702,161.7968 507.678955,161.7968 L507.678955,161.7968 Z M507.678955,165.7726 L486.75315,165.7726 C486.366402,165.7726 486.048717,165.456733 486.048717,165.0722 C486.048717,164.6808 486.366402,164.3718 486.75315,164.3718 L507.678955,164.3718 C508.065702,164.3718 508.383388,164.6808 508.383388,165.0722 C508.383388,165.456733 508.065702,165.7726 507.678955,165.7726 L507.678955,165.7726 Z M482.125992,147.527867 C480.758563,147.527867 479.625945,146.415467 479.625945,145.035267 L479.625945,139.418333 C479.625945,138.031267 480.620439,136.815867 482.125992,136.1292 C482.125992,136.1292 488.224172,134.0486 497.222958,134.0486 C506.207933,134.0486 512.340644,136.1292 512.340644,136.1292 C514.308913,137.104267 514.833784,138.779733 514.833784,140.159933 L514.833784,145.035267 C514.833784,146.415467 513.714979,147.527867 512.340644,147.527867 L482.125992,147.527867 Z M479.708819,165.168333 C477.50574,165.168333 475.723938,163.396733 475.723938,161.213133 C475.723938,159.0364 477.50574,157.2648 479.708819,157.2648 C481.898087,157.2648 483.686794,159.0364 483.686794,161.213133 C483.686794,163.396733 481.898087,165.168333 479.708819,165.168333 L479.708819,165.168333 Z M526.967989,169.8926 L526.042557,169.8926 L526.042557,167.509867 C526.042557,163.190733 525.780121,159.214933 525.241437,155.5962 C525.227625,155.541267 525.220719,155.486333 525.2,155.4314 L525.2,131.404933 L523.763509,131.404933 L523.763509,125.822333 L521.843584,125.822333 L521.843584,131.404933 L520.39328,131.404933 L520.39328,147.802533 C520.054876,147.5828 519.709566,147.3768 519.329725,147.1708 L519.329725,130.388667 C519.329725,129.015333 512.761923,124.771733 497.00196,124.771733 C481.235091,124.771733 474.84685,129.015333 474.84685,130.388667 L474.84685,147.301267 C471.794307,148.9836 469.915819,151.744 469.190667,155.5962 C468.651983,159.214933 468.396454,163.190733 468.396454,167.509867 L468.396454,169.8926 L467.464116,169.8926 C466.490341,169.8926 466,171.211 466,173.8478 C466,176.409067 466.490341,177.693133 467.464116,177.693133 L473.583014,177.693133 L473.583014,178.881067 C473.583014,180.652667 473.652077,182.101533 473.783294,183.2414 C473.914512,184.388133 474.073355,185.315133 474.259823,186.0224 C475.04713,187.3408 476.518152,188 478.638357,188 C480.668782,188 482.098367,187.3408 482.899487,186.0224 C483.424358,184.958067 483.700607,182.836267 483.700607,179.684467 L483.700607,177.693133 L510.738404,177.693133 L510.738404,179.684467 C510.738404,182.836267 511.007746,184.958067 511.539524,186.0224 C512.333738,187.3408 513.756416,188 515.793747,188 C517.920859,188 519.391881,187.3408 520.186094,186.0224 C520.351843,185.315133 520.524498,184.388133 520.64881,183.2414 C520.780028,182.101533 520.84909,180.652667 520.84909,178.881067 L520.84909,177.693133 L526.967989,177.693133 C527.941764,177.693133 528.432105,176.409067 528.432105,173.8478 C528.432105,171.211 527.941764,169.8926 526.967989,169.8926 L526.967989,169.8926 Z M540,96.9617333 C540,96.3986667 539.495847,95.9660667 538.487541,95.6982667 L536.339711,94.9360667 C533.90182,94.0090667 532.396267,93.5627333 531.829958,93.5627333 C531.75399,93.5627333 531.325805,93.6588667 530.531591,93.8854667 C529.737378,94.0914667 528.535698,94.476 526.878208,95.0596667 C526.740084,95.1146 525.80084,95.3137333 524.074288,95.6364667 C522.361549,95.9523333 519.771722,96.4673333 516.332431,97.1952 L482.250303,85.103 C482.181241,85.0343333 481.939524,85 481.497527,85 C480.288941,85 479.239197,85.5699333 478.369015,86.7098 L500.102846,99.9556 L492.789174,101.3564 L486.449277,96.3437333 L484.722725,96.6596 L484.722725,100.6148 L477.409053,97.8338 L476.007093,98.6921333 L482.464396,104.350267 L482.464396,104.666133 C482.464396,105.6618 483.141204,106.169933 484.501727,106.169933 L487.747643,110.118267 L489.349883,109.5964 L489.888567,106.7124 L506.870929,106.7124 L510.434531,109.383533 L510.434531,117.9394 L513.652823,117.9394 L520.220625,103.814667 C522.423705,103.471333 524.764909,103.011267 527.2028,102.4894 C529.647597,101.940067 532.251237,101.390733 535.04825,100.827667 C535.552403,100.6148 536.084181,100.347 536.664302,100.024267 C537.244424,99.7015333 537.783108,99.3650667 538.287261,99.008 C538.777601,98.6578 539.185068,98.3007333 539.509659,97.9368 C539.841157,97.5797333 540,97.257 540,96.9617333 L540,96.9617333 Z",
        "etc": "M515.0872,114.0084 C515.074,107.877 510.1174,102.927 503.986,102.9072 C497.8744,102.927 492.898,107.877 492.8848,114.0084 C492.8848,114.972 492.106,115.7574 491.1424,115.7574 C490.1854,115.7574 489.4,114.972 489.4,114.0084 C489.4,105.9432 495.9406,99.4356 503.986,99.4224 C512.038,99.4356 518.5522,105.9432 518.572,114.0084 C518.572,114.972 517.7998,115.7574 516.8362,115.7574 C515.866,115.7574 515.0872,114.972 515.0872,114.0084 L515.0872,114.0084 Z M522.9676,114.0084 C522.9346,103.5144 514.48,95.0532 503.986,95.04 C493.5052,95.0532 485.0176,103.5144 484.9978,114.0084 C484.9978,114.972 484.2322,115.7574 483.2686,115.7574 C482.305,115.7574 481.5262,114.972 481.5262,114.0084 C481.5262,101.6136 491.578,91.5684 503.986,91.5288 C516.4006,91.5684 526.4524,101.6136 526.4524,114.0084 C526.4524,114.972 525.6736,115.7574 524.71,115.7574 C523.753,115.7574 522.9676,114.972 522.9676,114.0084 L522.9676,114.0084 Z M532.0096,114.0084 C531.9766,98.5314 519.4696,86.0244 503.986,85.9914 C488.5222,86.0244 476.002,98.5314 475.9624,114.0084 C475.9624,114.972 475.1968,115.7574 474.2266,115.7574 C473.2696,115.7574 472.4974,114.972 472.4974,114.0084 C472.4974,96.6174 486.6016,82.5 503.986,82.5 C521.3902,82.5 535.501,96.6174 535.501,114.0084 C535.501,114.972 534.7156,115.7574 533.752,115.7574 C532.795,115.7574 532.0096,114.972 532.0096,114.0084 L532.0096,114.0084 Z M502.996,153.5952 C502.996,155.166 501.7156,156.453 500.1448,156.453 L485.7832,156.453 C484.1992,156.453 482.9254,155.166 482.9254,153.5952 L482.9254,136.6992 C482.9254,135.1152 484.1992,133.8414 485.7832,133.8414 L500.1448,133.8414 C501.7156,133.8414 502.996,135.1152 502.996,136.6992 L502.996,153.5952 Z M505.1608,128.0004 L505.1608,117.7506 C505.966,117.1962 506.494,116.2722 506.494,115.2228 C506.494,113.5266 505.1014,112.134 503.4052,112.134 C501.7024,112.134 500.323,113.5266 500.323,115.2228 C500.323,116.2656 500.8444,117.1896 501.6298,117.744 L501.6298,127.9146 L481.876,127.9146 C480.3052,127.9146 479.0182,129.195 479.0182,130.7658 L479.0182,178.6488 C479.0182,180.2262 480.3052,181.5 481.876,181.5 L504.5074,181.5 C506.0848,181.5 507.3652,180.2262 507.3652,178.6488 L507.3652,130.7658 C507.3652,129.4194 506.4214,128.2974 505.1608,128.0004 L505.1608,128.0004 Z",
        "health": "M502.375839,153.967152 C501.266652,154.671777 500.186964,155.33564 499.124976,155.999502 L499.290174,144.055803 C505.030809,146.321088 504.606014,149.314292 504.700413,150.59543 C504.853811,151.538813 504.06322,152.936418 502.375839,153.967152 M488.723394,150.59543 C488.811893,149.279352 488.351698,146.146387 494.646927,143.863633 L494.794425,156.30814 C493.579039,155.551104 492.322353,154.770774 491.042067,153.967152 C489.354686,152.936418 488.564095,151.538813 488.723394,150.59543 M513.892509,100.543702 C511.101841,98.2842411 509.154863,98.8141663 506.358294,103.740724 C504.505715,107.001802 501.561648,107.391967 499.762169,107.29297 L499.773969,106.646577 C501.862545,105.615844 503.337528,103.536906 503.337528,101.079451 C503.337528,97.6203787 500.49966,94.8251688 497.001,94.8251688 C493.50234,94.8251688 490.652672,97.6203787 490.652672,101.079451 C490.652672,103.536906 492.127655,105.615844 494.222131,106.640754 L494.228031,107.29297 C492.428552,107.391967 489.478585,107.001802 487.631906,103.740724 C484.841237,98.8141663 482.894259,98.2842411 480.109491,100.543702 C477.301123,102.808987 466.238748,115.859123 452.7515,114.659512 C452.7515,114.659512 455.42417,120.651744 462.710587,119.324019 C462.710587,119.324019 466.604543,123.313016 472.929272,120.517806 C472.929272,120.517806 476.209635,123.44113 481.436976,120.785681 C481.436976,120.785681 485.319132,123.714828 489.466785,121.181669 C489.466785,121.181669 491.803159,122.852971 494.399129,122.422043 L494.570227,137.48706 C494.275231,137.428826 494.039233,137.358946 493.726537,137.306536 C493.714737,137.300713 489.201288,136.345683 484.422342,135.023781 C479.826294,133.835817 474.775951,131.908287 474.03256,130.90667 C474.097459,130.842613 474.203658,130.796026 474.333456,130.731969 C474.740552,130.516505 475.442644,130.301041 476.268634,130.132164 C477.956015,129.794409 480.245189,129.619709 482.546163,129.526535 C487.112712,129.363481 487.938702,129.561475 488.015402,129.578945 C488.021301,129.433361 490.664472,129.88176 491.390163,127.232134 C491.360664,127.20884 491.437363,127.098196 491.396063,127.03414 C491.242665,125.21143 489.820781,125.118256 488.658494,124.908615 C486.764616,124.664035 487.749905,124.757208 485.207033,124.792148 C481.023981,125.094963 468.132626,124.070052 466.510145,130.766909 C466.510145,130.953257 466.498345,131.069724 466.474745,131.238601 C467.017539,137.067778 479.248101,139.600937 488.1098,141.34212 C485.100834,143.374471 483.496053,146.018273 482.85296,149.436582 C482.552063,153.087825 485.48433,156.552721 492.292853,160.431075 C487.118612,164.041554 483.72025,167.442393 483.997547,171.542034 C484.481341,174.884639 487.472608,179.351152 493.348941,182.169655 C493.366641,182.181302 493.372541,182.163832 493.384341,182.169655 L493.402041,182.169655 C493.402041,182.169655 489.283887,175.973606 489.00659,172.584414 C488.735193,170.610297 489.87978,167.68115 494.877024,164.163844 L495.024522,176.550118 L495.048122,176.550118 C495.083522,177.604145 495.903612,178.448532 496.942001,178.448532 C497.980389,178.448532 498.80638,177.604145 498.835879,176.550118 L498.853579,176.550118 L499.024677,164.495776 C503.632525,167.861674 504.676813,170.668531 504.411316,172.584414 C504.134019,175.973606 500.027666,182.169655 500.027666,182.169655 L500.039466,182.169655 C500.039466,182.169655 500.045366,182.181302 500.074865,182.169655 C505.945299,179.351152 508.942465,174.884639 509.42036,171.542034 C509.697657,167.442393 506.299295,164.041554 501.130953,160.431075 C507.933576,156.552721 510.871743,153.087825 510.570847,149.436582 C509.927754,146.018273 508.322972,143.374471 505.308106,141.34212 C514.175706,139.600937 526.400368,137.067778 526.943162,131.238601 C526.919562,131.069724 526.907762,130.953257 526.907762,130.766909 C525.29118,124.070052 512.393926,125.094963 508.210873,124.792148 C505.668002,124.757208 506.653291,124.664035 504.759412,124.908615 C503.597125,125.118256 502.175242,125.21143 502.021843,127.03414 C501.980544,127.098196 502.063143,127.20884 502.033643,127.232134 C502.759335,129.88176 505.402505,129.433361 505.408405,129.578945 C505.479204,129.561475 506.305195,129.363481 510.877643,129.526535 C513.172717,129.619709 515.461891,129.794409 517.149272,130.132164 C517.987063,130.301041 518.671455,130.516505 519.08445,130.731969 C519.214249,130.796026 519.326348,130.842613 519.391247,130.90667 C518.647855,131.908287 513.597512,133.835817 509.001464,135.023781 C504.222518,136.345683 499.703169,137.300713 499.69137,137.306536 C499.573371,137.329829 499.484872,137.353123 499.366873,137.370593 L499.561571,122.422043 C502.181141,122.870441 504.535215,121.181669 504.535215,121.181669 C508.665168,123.714828 512.565024,120.785681 512.565024,120.785681 C517.786465,123.44113 521.066828,120.517806 521.066828,120.517806 C527.385657,123.313016 531.279613,119.324019 531.279613,119.324019 C538.57193,120.651744 541.2505,114.659512 541.2505,114.659512 C527.757352,115.859123 516.694977,102.808987 513.892509,100.543702",
        "shelter": "M471.145813,133.725918 L497.0065,116.797124 L522.867186,133.725918 L471.145813,133.725918 Z M538.2505,135.359399 L497.0065,108.365726 L455.7515,135.359399 L459.617953,141.266327 L465.293884,137.559372 L465.293884,182.174831 L528.724615,182.174831 L528.724615,137.559372 L534.384047,141.266327 L538.2505,135.359399 Z",
        "protection": "M496.996067,147.400992 C501.445933,147.400992 505.215,145.796349 508.377267,142.661124 C511.524733,139.511088 513.098467,135.734006 513.098467,131.265693 C513.098467,126.827005 511.524733,123.020299 508.377267,119.870262 C505.215,116.715288 501.445933,115.174831 496.996067,115.174831 C492.556067,115.174831 488.7426,116.715288 485.629667,119.870262 C482.457533,123.020299 480.903533,126.827005 480.903533,131.265693 C480.903533,135.734006 482.457533,139.511088 485.629667,142.661124 C488.7426,145.796349 492.556067,147.400992 496.996067,147.400992 M521.766333,140.903424 L504.751267,158.361935 L504.751267,182.095833 L504.8894,182.095833 L504.8894,182.174831 L518.840867,182.174831 L518.840867,171.929805 L533.063667,153.118457 C533.631,152.417351 534.001,151.553313 534.001,150.60534 L534.001,121.702024 C534.001,119.440712 532.1658,117.599076 529.896467,117.599076 C527.641933,117.599076 525.8018,119.440712 525.8018,121.702024 L525.8018,138.395244 C526.798333,138.612488 527.735667,139.027226 528.4954,139.76783 C530.671,141.895833 530.725267,145.391486 528.603933,147.573799 L520.838867,155.557514 L519.7782,154.525605 L527.553133,146.56164 C529.107133,144.95206 529.0726,142.379695 527.479133,140.814551 C526.9858,140.345502 526.383933,140.009761 525.7574,139.832016 C525.0914,139.639459 524.390867,139.629584 523.719933,139.76783 C522.970067,139.95545 522.2942,140.345502 521.766333,140.903424 M472.2406,140.903424 L489.2458,158.361935 L489.2458,182.095833 L489.107667,182.095833 L489.107667,182.174831 L475.166067,182.174831 L475.166067,171.929805 L460.938333,153.118457 C460.371,152.417351 460.001,151.553313 460.001,150.60534 L460.001,121.702024 C460.001,119.440712 461.8362,117.599076 464.105533,117.599076 C466.360067,117.599076 468.2002,119.440712 468.2002,121.702024 L468.2002,138.395244 C467.2086,138.612488 466.266333,139.027226 465.5066,139.76783 C463.335933,141.895833 463.281667,145.391486 465.403,147.573799 L473.163133,155.557514 L474.218867,154.525605 L466.448867,146.56164 C464.894867,144.95206 464.9294,142.379695 466.517933,140.814551 C467.021133,140.345502 467.6082,140.009761 468.239667,139.832016 C468.915533,139.639459 469.611133,139.629584 470.282067,139.76783 C471.036867,139.95545 471.712733,140.345502 472.2406,140.903424",
        "wash": "M534.093581,153.551892 L534.093581,144.336087 C534.093581,138.497856 528.794104,133.452216 521.764398,133.452216 L505.347935,133.452216 L505.25987,128.32887 C505.25987,126.857657 504.058033,125.655821 502.58164,125.655821 L496.163212,125.655821 L496.163212,122.366312 C496.717507,122.039951 497.178556,121.625525 497.567081,121.123033 L511.237969,121.123033 C512.154888,122.293787 513.501773,123.112279 515.102495,123.112279 C517.822167,123.112279 520.039348,120.900279 520.039348,118.170245 C520.039348,115.440212 517.822167,113.228211 515.102495,113.228211 C513.470691,113.228211 512.082363,114.088146 511.186166,115.321064 L497.634425,115.321064 C496.722687,114.088146 495.3499,113.228211 493.707736,113.228211 C492.081113,113.228211 490.687604,114.088146 489.791407,115.321064 L474.830617,115.321064 C473.93442,114.088146 472.551272,113.228211 470.924649,113.228211 C468.189435,113.228211 465.982615,115.440212 465.982615,118.170245 C465.982615,120.900279 468.189435,123.112279 470.924649,123.112279 C472.50983,123.112279 473.867076,122.293787 474.763273,121.123033 L489.853571,121.123033 C490.247276,121.635885 490.718686,122.055492 491.283342,122.371492 L491.283342,125.655821 L484.471209,125.655821 C482.999996,125.655821 481.79816,126.857657 481.79816,128.32887 L481.79816,133.452216 L461.853893,133.452216 L461.853893,149.412809 L484.041242,149.412809 C486.21698,153.774647 489.112784,155.934844 493.469441,155.934844 C497.820917,155.934844 501.447147,153.774647 503.622886,149.412809 L511.605773,149.412809 C513.988724,149.412809 514.86938,150.946187 515.123216,153.883433 C514.423872,154.360024 513.942101,155.131893 513.942101,156.043631 C513.942101,157.525205 515.143937,158.721861 516.615151,158.721861 L533.176663,158.721861 C534.653056,158.721861 535.854893,157.525205 535.854893,156.043631 C535.854893,154.888417 535.119286,153.924876 534.093581,153.551892 M524.665382,161.653927 C526.115874,164.554911 532.648269,179.790259 532.648269,181.971177 C532.648269,193.917016 516.687675,193.917016 516.687675,181.971177 C516.687675,179.790259 523.21489,163.829665 524.665382,161.653927",
        "coordination": "M550.717754,143.247246 C552.186241,141.146395 551.666298,138.244551 549.551395,136.776063 L506.599886,106.893391 C502.187396,103.829943 495.526504,103.829943 491.121041,106.893391 L448.155479,136.776063 C446.047602,138.244551 445.520633,141.146395 446.989121,143.247246 C448.457608,145.355123 451.352426,145.882092 453.46733,144.413604 L496.418839,114.530933 C497.627355,113.687782 500.086545,113.687782 501.288035,114.530933 L544.246571,144.413604 C545.05459,144.975705 545.982056,145.242703 546.89547,145.242703 C548.370984,145.242703 549.818393,144.547103 550.717754,143.247246 L550.717754,143.247246 Z M498.85695,179.804861 C498.85695,179.804861 500.198965,189.121678 500.198965,189.128704 C500.374622,189.585411 500.81025,189.915645 501.330193,189.915645 C501.864188,189.915645 502.313869,189.557306 502.475473,189.065468 C502.489525,189.044389 502.51763,188.496341 502.489525,188.397973 L501.941477,176.952201 L502.110107,173.024523 C502.264685,171.682508 502.29279,172.083005 503.810461,171.176617 C505.363264,170.242125 508.005137,166.152844 508.13161,165.949082 C508.258082,165.745321 508.504001,165.386982 508.553185,165.155115 C508.623448,164.747592 508.35645,164.354122 507.948927,164.269807 C507.639772,164.220623 507.3798,164.382227 507.176039,164.600041 C506.972277,164.817855 503.929908,168.864979 501.653401,169.251423 C501.14751,169.174134 500.592436,168.914163 499.145027,168.914163 L498.568874,168.914163 C497.121465,168.914163 496.56639,169.174134 496.053474,169.251423 C493.776966,168.864979 490.734597,164.817855 490.530836,164.600041 C490.3341,164.382227 490.074129,164.220623 489.764974,164.269807 C489.357451,164.354122 489.090453,164.747592 489.160715,165.155115 C489.209899,165.386982 489.455818,165.745321 489.575265,165.949082 C489.701737,166.152844 492.350636,170.242125 493.896413,171.176617 C495.421111,172.083005 495.449216,171.682508 495.603793,173.024523 L495.772423,176.952201 L495.231402,188.397973 C495.19627,188.496341 495.231402,189.044389 495.238428,189.065468 C495.400032,189.557306 495.842686,189.915645 496.383708,189.915645 C496.896625,189.915645 497.339279,189.585411 497.514935,189.128704 C497.514935,189.121678 498.85695,179.804861 498.85695,179.804861 L498.85695,179.804861 Z M498.85695,162.260297 C497.20578,162.260297 495.870791,163.595286 495.870791,165.23943 C495.870791,166.883574 497.20578,168.211537 498.85695,168.211537 C500.501094,168.211537 501.836083,166.883574 501.836083,165.23943 C501.836083,163.595286 500.501094,162.260297 498.85695,162.260297 L498.85695,162.260297 Z M523.50506,161.325805 L523.835294,150.765341 L529.765455,163.897415 C530.011374,164.473568 530.678869,164.747592 531.262048,164.501673 C531.838201,164.255754 532.119251,163.595286 531.866306,163.00508 C531.866306,163.00508 527.692709,149.936242 526.498246,147.498131 C525.310808,145.067046 523.469929,143.584506 518.937993,143.584506 L518.003501,143.584506 C513.478591,143.584506 511.630686,145.067046 510.443248,147.498131 C509.248784,149.936242 505.075188,163.00508 505.075188,163.00508 C504.829269,163.595286 505.096267,164.255754 505.679446,164.501673 C506.262625,164.747592 506.93012,164.473568 507.169012,163.897415 L513.1062,150.765341 L513.429407,161.325805 L512.501941,187.871004 C512.424653,188.924943 513.21862,189.83133 514.265532,189.908619 C514.314716,189.908619 514.3639,189.915645 514.399031,189.915645 C515.396759,189.915645 516.232884,189.142757 516.310173,188.138002 L518.467234,167.614305 L520.631321,188.138002 C520.701583,189.142757 521.537708,189.915645 522.535437,189.915645 C522.577594,189.915645 522.626778,189.908619 522.668935,189.908619 C523.722874,189.83133 524.509815,188.924943 524.439552,187.871004 L523.498034,161.325805 L523.50506,161.325805 Z M518.481286,132.742991 C515.79023,132.742991 513.61209,134.914105 513.61209,137.598135 C513.61209,140.282165 515.79023,142.453278 518.481286,142.453278 C521.151264,142.453278 523.322377,140.282165 523.322377,137.598135 C523.322377,134.914105 521.151264,132.742991 518.481286,132.742991 L518.481286,132.742991 Z M479.759584,170.860436 L480.79947,188.770365 C480.79947,189.402728 481.319413,189.915645 481.937723,189.915645 C482.570086,189.915645 483.083003,189.402728 483.083003,188.770365 L484.052627,170.860436 L487.221469,170.860436 L483.947233,150.779393 L490.537862,163.904441 C490.783781,164.487621 491.451275,164.768671 492.034455,164.515726 C492.610608,164.269807 492.891658,163.602312 492.638713,163.019133 C492.638713,163.019133 487.804648,149.950295 486.610184,147.512184 C485.422747,145.081099 484.242336,143.598558 479.7104,143.598558 L478.775908,143.598558 C474.258024,143.598558 473.070587,145.081099 471.876123,147.512184 C470.688686,149.950295 465.847595,163.019133 465.847595,163.019133 C465.608702,163.602312 465.8757,164.269807 466.451853,164.515726 C467.035032,164.768671 467.702526,164.487621 467.948445,163.904441 L474.546101,150.779393 L471.257812,170.860436 L474.426654,170.860436 L475.41033,188.770365 C475.41033,189.402728 475.923247,189.915645 476.548584,189.915645 C477.187973,189.915645 477.693864,189.402728 477.693864,188.770365 L478.670514,170.860436 L479.759584,170.860436 Z M484.10181,137.612187 C484.10181,140.289191 481.930697,142.467331 479.246667,142.467331 C476.562637,142.467331 474.384497,140.289191 474.384497,137.612187 C474.384497,134.928157 476.562637,132.757044 479.246667,132.757044 C481.930697,132.757044 484.10181,134.928157 484.10181,137.612187 L484.10181,137.612187 Z",
        "education": "M540.015749,184.572879 C519.672049,171.747519 502.068795,183.500545 502.068795,185.511171 L502.068795,142.764034 C502.068795,135.166303 512.149499,131.065844 524.587836,131.065844 C530.566988,131.065844 535.987113,132.485468 540.015749,134.806828 L540.015749,184.572879 Z M495.937733,185.511171 C495.937733,183.500545 478.322326,171.747519 457.978626,184.572879 L457.978626,134.806828 C462.007262,132.485468 467.427387,131.065844 473.406539,131.065844 C485.857029,131.065844 495.937733,135.166303 495.937733,142.764034 L495.937733,185.511171 Z M499.304044,133.295811 C496.150406,130.273779 478.048889,119.775872 453.281589,130.474841 L453.281589,138.121315 L453.281589,189.160763 L490.803197,189.160763 C492.091389,190.275747 495.153881,191.055626 498.738942,191.055626 C502.317926,191.055626 505.386495,190.275747 506.680762,189.160763 L544.427196,189.160763 L544.427196,138.121315 L544.427196,130.474841 C520.674651,119.976934 501.698136,131.084122 499.304044,133.295811 L499.304044,133.295811 Z",
        "social": "M522.287557,136.708182 C528.076142,139.655825 528.26287,124.210708 528.26287,124.210708 C526.929095,125.004304 516.498973,133.760538 522.287557,136.708182 M521.734041,144.090628 C527.189181,146.878218 534.43825,136.12799 534.444919,134.487446 C534.444919,134.487446 532.977766,138.428752 526.548969,138.101977 C519.299901,137.761864 519.293232,142.836879 521.734041,144.090628 M517.719377,151.946564 C523.174518,154.734154 530.436924,143.983926 530.450262,142.336713 C530.450262,142.336713 528.963102,146.278019 522.534306,145.964582 C515.291906,145.624469 515.278568,150.706153 517.719377,151.946564 M513.591343,160.049248 C519.053152,162.83017 526.302221,152.08661 526.315559,150.439398 C526.315559,150.439398 524.835068,154.360697 518.399602,154.067266 C511.163872,153.713816 511.157203,158.802169 513.591343,160.049248 M517.899437,133.700519 C513.858098,128.678855 516.185536,125.171026 516.185536,125.171026 C514.865098,126.144682 510.416958,138.308712 515.86543,141.102971 C518.306238,142.343382 522.414266,139.355726 517.899437,133.700519 M513.884773,141.556455 C509.856772,136.528122 512.18421,133.020293 512.18421,133.020293 C510.850435,134.000618 506.402294,146.171317 511.864104,148.958907 C514.304913,150.205987 518.41294,147.218331 513.884773,141.556455 M509.756739,149.65247 C505.728738,144.624138 508.042838,141.122978 508.042838,141.122978 C506.715731,142.096634 502.280929,154.274002 507.722732,157.054923 C510.176878,158.302003 514.284906,155.307677 509.756739,149.65247 M507.562679,167.678443 L511.744064,160.976222 C512.084177,160.309335 510.923792,160.462719 509.87011,159.92254 C508.809759,159.382361 508.256242,158.368692 507.929467,159.022241 L504.975155,166.578078 C504.615035,167.291648 506.78242,169.212284 507.562679,167.678443 M531.083805,152.26667 C530.443593,153.293677 529.743361,154.233988 529.056467,155.1743 C532.71768,156.71481 535.011773,158.662122 535.011773,160.802831 C535.011773,165.751138 523.274551,169.765801 508.809759,169.765801 C494.338297,169.765801 482.601075,165.751138 482.601075,160.802831 C482.601075,156.561426 491.243939,153.020253 502.814439,152.093279 C502.821108,151.092948 502.834445,150.099285 502.941147,149.038934 C488.182924,149.725828 476.939199,153.500412 476.939199,165.137601 C476.939199,178.195261 491.077217,192.5 508.509659,192.5 C525.935433,192.5 540.066781,178.195261 540.066781,165.137601 C540.066781,158.715473 536.625641,154.70081 531.083805,152.26667 M485.048553,134.707519 L485.048553,140.842885 C484.428347,140.596137 483.854824,140.175997 483.347989,139.615812 C482.834486,139.048957 482.494373,138.375401 482.307645,137.595142 L477.772809,138.001944 C478.11959,139.92258 478.913187,141.416408 480.166935,142.470091 C481.414015,143.523773 483.041221,144.157316 485.048553,144.357383 L485.048553,147.024933 L487.569388,147.024933 L487.569388,144.290694 C489.823468,144.010601 491.584051,143.270356 492.857807,142.063289 C494.124893,140.849554 494.758436,139.355726 494.758436,137.595142 C494.758436,136.014619 494.258271,134.714188 493.244601,133.700519 C492.24427,132.686849 490.350309,131.866578 487.569388,131.233034 L487.569388,125.50447 C488.696428,125.911271 489.383322,126.704867 489.650077,127.851914 L494.051536,127.365086 C493.751436,125.904602 493.051204,124.73088 491.964177,123.857257 C490.87715,122.983635 489.403329,122.456793 487.569388,122.270065 L487.569388,120.81625 L485.048553,120.81625 L485.048553,122.270065 C483.054559,122.430118 481.460697,123.063661 480.2603,124.150688 C479.059902,125.237715 478.466372,126.584828 478.466372,128.185358 C478.466372,129.772551 478.993213,131.112995 480.053564,132.226697 C481.113916,133.33373 482.774466,134.160671 485.048553,134.707519 M476.572411,154.447392 L468.616442,154.447392 C460.480413,154.447392 458.719829,147.665145 458.719829,147.665145 C453.384728,124.170695 469.590098,111.419803 469.590098,111.419803 L503.307936,111.419803 C503.307936,111.419803 509.703388,116.461474 513.13119,126.03798 C510.883779,128.652179 508.809759,131.719862 507.075851,135.23436 C505.448645,138.548792 504.301598,141.88323 503.58136,145.077621 C495.358635,145.351045 482.681102,146.818198 476.572411,154.447392 M498.526351,92.5535525 C491.997522,91.8333138 489.710097,95.8413084 486.455686,96.0013615 C483.16793,95.8413084 480.907181,91.8333138 474.365013,92.5535525 C467.696137,93.3004666 463.64146,98.9756802 463.64146,98.9756802 L471.784158,106.544855 L501.107207,106.544855 L509.249904,98.9756802 C509.249904,98.9756802 505.195228,93.3004666 498.526351,92.5535525 M482.801141,128.678855 C482.801141,129.192358 482.994539,129.679186 483.361327,130.119332 C483.741453,130.572816 484.301639,130.919597 485.048553,131.19969 L485.048553,126.131344 C484.361658,126.318073 483.814811,126.658185 483.414678,127.118338 C483.007877,127.598497 482.801141,128.105331 482.801141,128.678855 M489.816799,137.094977 C490.276952,137.568467 490.497024,138.128652 490.497024,138.788871 C490.497024,139.50911 490.230269,140.155991 489.683422,140.69617 C489.143243,141.236349 488.443011,141.576461 487.569388,141.709839 L487.569388,136.001281 C488.603064,136.254698 489.356647,136.621486 489.816799,137.094977",
        "coordination2": "M492,133.229333 C486.602667,133.229333 482.229333,137.602667 482.229333,143 C482.229333,148.408 486.602667,152.781333 492,152.781333 C497.397333,152.781333 501.776,148.408 501.776,143 C501.776,137.602667 497.397333,133.229333 492,133.229333 L492,133.229333 Z M459.445333,132.893333 L481.888,132.893333 L481.898667,110.44 L475.178667,117.165333 L461.013333,103 L452,112.018667 L466.16,126.168 L459.445333,132.893333 Z M532,112.008 L522.997333,103 L508.832,117.165333 L502.112,110.450667 L502.112,132.888 L524.565333,132.893333 L517.84,126.168 L532,112.008 Z M522.997333,183 L532,173.992 L517.845333,159.832 L524.56,153.117333 L502.117333,153.117333 L502.112,175.565333 L508.832,168.845333 L522.997333,183 Z M466.16,159.832 L459.44,153.117333 L481.893333,153.117333 L481.893333,175.565333 L475.173333,168.845333 L461.013333,183 L452,173.992 L466.16,159.832 Z"
      };

      var icon = _.result(_.find(labelMapping, function(item) {
        return item.original == original;
      }), 'icon');

      return (icon && _.has(icons, icon)) ? icons[icon] : undefined;
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
